import { NextRequest, NextResponse } from 'next/server';
import { nowPaymentsService } from '@/app/services/nowpayments';
import { requireAuth } from '@/app/lib/auth';
import { getPlanById } from '@/app/data/pricing-plans';
import prisma from '@/app/lib/prisma';
import { getCurrentUser } from '@/app/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { planId, payCurrency = 'btc' } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Get plan details
    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `plutus_${Date.now()}`;

    // Create payment with NowPayments
    const paymentData = {
      price_amount: plan.price,
      price_currency: 'usd',
      pay_currency: payCurrency,
      order_id: orderId,
      order_description: `Plutus ${plan.title} - ${plan.description}`,
      customer_email: user.email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
      is_fixed_rate: true,
    };

    const paymentResponse = await nowPaymentsService.createPayment(paymentData);

    // Save payment to database
    const payment = await prisma.payment.create({
      data: {
        amount: plan.price,
        userId: user.id,
        status: 'PENDING',
        currency: payCurrency.toUpperCase(),
        transactionId: "5601831053",//paymentResponse.payment_id,
        paymentMethod: 'CRYPTOCURRENCY',
        provider: 'NOWPAYMENTS',
      },
    });

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        paymentId: paymentResponse.payment_id,
        payAddress: paymentResponse.pay_address,
        payAmount: paymentResponse.pay_amount,
        payCurrency: paymentResponse.pay_currency,
        priceAmount: paymentResponse.price_amount,
        priceCurrency: paymentResponse.price_currency,
        orderId: paymentResponse.order_id,
        status: paymentResponse.payment_status,
        paymentUrl: paymentResponse.payment_url,
      },
      plan,
    });

  } catch (error: any) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
