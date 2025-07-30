import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/utils/jwt';
import prisma from '@/app/lib/prisma';
import { sendDepositReceiptEmail, sendWithdrawalReceiptEmail } from '@/app/lib/email';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      amount,
      currency,
      senderAddress,
      receiverAddress,
      receiverEmail,
      transactionHash,
      network,
      _transactionType = 'flash' // 'flash', 'deposit', 'withdrawal'
    } = body;

    // Check transaction limits for FREE users (one-time 3 trial limit)
    if (user.plan === 'FREE') {
      // Count user's total transactions (not daily, but total)
      const totalTransactions = await prisma.transaction.count({
        where: {
          userId: user.id
        }
      });

      if (totalTransactions >= 3) {
        return NextResponse.json(
          { 
            error: 'Free trial limit reached. You have used all 3 free trials. Please rent a server to make unlimited real crypto transactions.',
            type: 'LIMIT_REACHED'
          },
          { status: 403 }
        );
      }
    }

    // Check transaction amount limits based on plan (FREE users have no amount limit)
    if (user.plan !== 'FREE') {
      const maxAmount = getMaxTransactionAmount(user.plan);
      if (amount > maxAmount) {
        return NextResponse.json(
          { 
            error: `Transaction amount exceeds your plan limit of $${maxAmount.toLocaleString()}. Please upgrade your plan.`,
            type: 'AMOUNT_EXCEEDED'
          },
          { status: 403 }
        );
      }
    }

    // Generate unique transaction ID
    const transactionId = `${network}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        userId: user.id,
        type: user.plan as any,
        status: 'PENDING',
        transactionId,
      }
    });

    // Send appropriate email notifications
    const transactionData = {
      transactionId,
      transactionHash,
      amount: parseFloat(amount).toString(),
      currency,
      network,
      timestamp: new Date().toISOString(),
      fromAddress: senderAddress,
      toAddress: receiverAddress,
      confirmations: 6,
      status: 'completed' as const
    };

    try {
      // Send deposit receipt to receiver
      if (receiverEmail) {
        await sendDepositReceiptEmail(receiverEmail, transactionData);
      }

      // Send withdrawal receipt to sender (user)
      await sendWithdrawalReceiptEmail(user.email, {
        ...transactionData,
        fee: calculateTransactionFee(parseFloat(amount), user.plan).toString(),
        status: 'completed' as const
      });

      // Update transaction status to confirmed
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'CONFIRMED' }
      });

    } catch (emailError) {
      console.error('Error sending email notifications:', emailError);
      // Don't fail the transaction if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        transactionId,
        amount: parseFloat(amount),
        currency,
        network,
        status: 'CONFIRMED',
        hash: transactionHash,
        senderAddress,
        receiverAddress,
        timestamp: transaction.createdAt,
        remainingTransactions: user.plan === 'FREE' ? 3 - (await getTotalTransactionCount(user.id)) : null
      }
    });

  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create transaction' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

function getMaxTransactionAmount(planType: string): number {
  switch (planType) {
    case 'FREE':
      return 1000; // $1,000 limit for testing
    case 'SMALL':
      return 10000; // $10,000
    case 'MEDIUM':
      return 50000; // $50,000
    case 'LARGE':
      return 200000; // $200,000
    case 'XLARGE':
      return Number.MAX_SAFE_INTEGER; // Unlimited
    default:
      return 1000;
  }
}

function calculateTransactionFee(amount: number, planType: string): number {
  switch (planType) {
    case 'FREE':
      return amount * 0.05; // 5% fee
    case 'SMALL':
      return amount * 0.03; // 3% fee
    case 'MEDIUM':
      return amount * 0.02; // 2% fee
    case 'LARGE':
      return amount * 0.015; // 1.5% fee
    case 'XLARGE':
      return amount * 0.01; // 1% fee
    default:
      return amount * 0.05;
  }
}

async function getTotalTransactionCount(userId: string): Promise<number> {
  return await prisma.transaction.count({
    where: {
      userId
    }
  });
}
