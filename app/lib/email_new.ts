import nodemailer from 'nodemailer'

// Define transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendVerificationEmail = async (email: string, verificationUrl: string) => {
  const mailOptions = {
    from: `Plutus <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://Plutus.uno/img.png" alt="Plutus Logo" style="max-width: 200px;">
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Verify Your Email</h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Welcome to Plutus! To complete your registration, please verify your email address by clicking the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="color: #007bff; font-size: 14px; word-break: break-all;">
            ${verificationUrl}
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This verification link will expire in 24 hours.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #666; font-size: 14px;">Follow us on social media:</p>
          <div style="margin: 15px 0;">
           <div class="flex space-x-4">
           <a href="https://t.me/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
           <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.227-.535.227l.19-2.712 4.94-4.465c.215-.19-.047-.296-.332-.106l-6.103 3.854-2.623-.816c-.57-.18-.582-.57.12-.843l10.238-3.948c.473-.174.887.104.605 1.337z">
           </path>
           </svg>
           </a>
           <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z">
           </path>
           </svg>
           </a>
           </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} Plutus. All rights reserved.<br>
            If you didn't create this account, please ignore this email.
          </p>
        </div>
      </div>
    </body>
    </html>
    `,
  }

  const res = await transporter.sendMail(mailOptions)

  console.log(
    res.messageId,
    res.response,
  )
}

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  const mailOptions = {
    from: `Plutus <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset your password',
    html: `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://Plutus.uno/img.png" alt="Plutus Logo" style="max-width: 200px;">
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Password Reset Request</h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            We received a request to reset your password. Click the button below to reset it:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="color: #007bff; font-size: 14px; word-break: break-all;">
            ${resetUrl}
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This password reset link will expire in 1 hour. If you didn't request this reset, please ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #666; font-size: 12px;">
            © ${new Date().getFullYear()} Plutus. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
    `,
  }

  const res = await transporter.sendMail(mailOptions)
  console.log(res.messageId, res.response)
}

export const sendDepositReceiptEmail = async (
  email: string,
  transactionDetails: {
    amount: string;
    currency: string;
    transactionId: string;
    transactionHash: string;
    timestamp: string;
    network: string;
    fromAddress: string;
    toAddress: string;
    confirmations: number;
    status: 'completed' | 'pending' | 'failed';
  }
) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getExplorerUrl = (hash: string, network: string) => {
    const explorers: { [key: string]: string } = {
      'BTC': `https://blockstream.info/tx/${hash}`,
      'ETH': `https://etherscan.io/tx/${hash}`,
      'USDT': `https://etherscan.io/tx/${hash}`,
      'LTC': `https://blockchair.com/litecoin/transaction/${hash}`,
      'BCH': `https://blockchair.com/bitcoin-cash/transaction/${hash}`,
      'TRON': `https://tronscan.org/#/transaction/${hash}`,
      'TRX': `https://tronscan.org/#/transaction/${hash}`
    };
    return explorers[network] || `https://blockchair.com/search?q=${hash}`;
  };

  const mailOptions = {
    from: `Plutus Crypto Flash <${process.env.SMTP_USER}>`,
    to: email,
    subject: `✅ DEPOSIT RECEIVED: +${transactionDetails.amount} ${transactionDetails.currency} | PLUTUS`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deposit Successful - PLUTUS</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    
    <!-- Main Container -->
    <div style="width:100%;background:#f5f7fa;padding:40px 20px;">
        <div style="max-width:480px;margin:0 auto;background:white;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.1);overflow:hidden;">
            
            <!-- Header -->
            <div style="text-align:center;padding:50px 40px 40px;background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);">
                <!-- Success Icon with Dotted Circle -->
                <div style="position:relative;display:inline-block;margin-bottom:24px;">
                    <!-- Dotted Circle -->
                    <div style="width:120px;height:120px;border:3px dotted #10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;">
                        <!-- Inner Success Circle -->
                        <div style="width:80px;height:80px;background:#10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(16,185,129,0.3);">
                            <!-- Checkmark -->
                            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <h1 style="color:#1f2937;font-size:32px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">Successful</h1>
                <p style="color:#6b7280;margin:0;font-size:16px;">You will receive</p>
            </div>

            <!-- Amount Display -->
            <div style="text-align:center;padding:0 40px 40px;background:white;">
                <!-- Main Amount -->
                <div style="margin-bottom:32px;">
                    <div style="font-size:48px;font-weight:800;color:#1f2937;margin-bottom:4px;line-height:1;">
                        ${parseFloat(transactionDetails.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} ${transactionDetails.currency}
                    </div>
                </div>

                <!-- Conversion Info -->
                <div style="background:#f8fafc;border-radius:16px;padding:24px;margin-bottom:32px;border:1px solid #e2e8f0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Converted</span>
                        <span style="color:#1f2937;font-size:16px;font-weight:700;">
                            ${(parseFloat(transactionDetails.amount) * 754989.0925).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BRL
                        </span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Price</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:600;">
                            1 ${transactionDetails.currency} = 311657.3 BRL
                        </span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display:flex;gap:16px;justify-content:center;">
                    <div style="flex:1;">
                        <div style="background:#f1f5f9;color:#64748b;padding:14px 24px;border-radius:12px;font-size:16px;font-weight:600;text-align:center;border:2px solid #e2e8f0;">
                            Back
                        </div>
                    </div>
                    <div style="flex:1;">
                        <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="display:block;background:#fbbf24;color:white;padding:14px 24px;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700;text-align:center;box-shadow:0 4px 14px rgba(251,191,36,0.4);transition:all 0.2s;">
                            View Status
                        </a>
                    </div>
                </div>
            </div>

            <!-- Transaction Details -->
            <div style="padding:0 40px 40px;background:white;border-top:1px solid #f1f5f9;">
                <h3 style="color:#1f2937;margin:32px 0 20px;font-size:18px;font-weight:700;">Transaction Details</h3>
                
                <div style="space-y:16px;">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Transaction ID</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:600;font-family:'SF Mono',Monaco,monospace;text-align:right;max-width:200px;word-break:break-all;">${transactionDetails.transactionId}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Hash</span>
                        <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="color:#3b82f6;font-size:14px;font-weight:600;font-family:'SF Mono',Monaco,monospace;text-decoration:none;text-align:right;max-width:200px;word-break:break-all;">
                            ${transactionDetails.transactionHash}
                        </a>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Date</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:600;">${formatDate(transactionDetails.timestamp)}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Network</span>
                        <span style="background:#10b981;color:white;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;">${transactionDetails.network}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Status</span>
                        <span style="background:#dcfce7;color:#166534;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;text-transform:uppercase;">
                            ✅ ${transactionDetails.status}
                        </span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Confirmations</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:700;">${transactionDetails.confirmations}/6</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align:center;padding:32px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                <p style="color:#6b7280;font-size:12px;margin:0 0 8px;font-weight:500;">
                    Powered by <strong style="color:#10b981;">PLUTUS</strong> Crypto Flash
                </p>
                <p style="color:#9ca3af;font-size:11px;margin:0;line-height:1.4;">
                    © ${new Date().getFullYear()} Plutus. All rights reserved.<br>
                    Transaction ID: ${transactionDetails.transactionId}
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `,
  }

  const res = await transporter.sendMail(mailOptions)
  console.log(res.messageId, res.response)
}

export const sendWithdrawalReceiptEmail = async (
  email: string,
  transactionDetails: {
    amount: string;
    currency: string;
    transactionId: string;
    transactionHash: string;
    timestamp: string;
    network: string;
    fromAddress: string;
    toAddress: string;
    fee: string;
    status: 'completed' | 'pending' | 'failed';
    estimatedArrival?: string;
  }
) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getExplorerUrl = (hash: string, network: string) => {
    const explorers: { [key: string]: string } = {
      'BTC': `https://blockstream.info/tx/${hash}`,
      'ETH': `https://etherscan.io/tx/${hash}`,
      'USDT': `https://etherscan.io/tx/${hash}`,
      'LTC': `https://blockchair.com/litecoin/transaction/${hash}`,
      'BCH': `https://blockchair.com/bitcoin-cash/transaction/${hash}`,
      'TRON': `https://tronscan.org/#/transaction/${hash}`,
      'TRX': `https://tronscan.org/#/transaction/${hash}`
    };
    return explorers[network] || `https://blockchair.com/search?q=${hash}`;
  };

  const mailOptions = {
    from: `Plutus Crypto Flash <${process.env.SMTP_USER}>`,
    to: email,
    subject: `⬆️ WITHDRAWAL SENT: -${transactionDetails.amount} ${transactionDetails.currency} | PLUTUS`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Processed - PLUTUS</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    
    <!-- Main Container -->
    <div style="width:100%;background:#f5f7fa;padding:40px 20px;">
        <div style="max-width:480px;margin:0 auto;background:white;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.1);overflow:hidden;">
            
            <!-- Header -->
            <div style="text-align:center;padding:50px 40px 40px;background:linear-gradient(135deg,#fef2f2 0%,#fee2e2 100%);">
                <!-- Success Icon with Dotted Circle -->
                <div style="position:relative;display:inline-block;margin-bottom:24px;">
                    <!-- Dotted Circle -->
                    <div style="width:120px;height:120px;border:3px dotted #ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;">
                        <!-- Inner Circle -->
                        <div style="width:80px;height:80px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(239,68,68,0.3);">
                            <!-- Arrow Up -->
                            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                <path d="M7,14L12,9L17,14H7Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <h1 style="color:#1f2937;font-size:32px;font-weight:700;margin:0 0 8px;letter-spacing:-0.5px;">Successful</h1>
                <p style="color:#6b7280;margin:0;font-size:16px;">You will spend</p>
            </div>

            <!-- Amount Display -->
            <div style="text-align:center;padding:0 40px 40px;background:white;">
                <!-- Main Amount -->
                <div style="margin-bottom:32px;">
                    <div style="font-size:48px;font-weight:800;color:#1f2937;margin-bottom:4px;line-height:1;">
                        ${parseFloat(transactionDetails.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} ${transactionDetails.currency}
                    </div>
                </div>

                <!-- Conversion Info -->
                <div style="background:#f8fafc;border-radius:16px;padding:24px;margin-bottom:32px;border:1px solid #e2e8f0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Converted</span>
                        <span style="color:#1f2937;font-size:16px;font-weight:700;">
                            ${(parseFloat(transactionDetails.amount) * 754989.0925).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BRL
                        </span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Price</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:600;">
                            1 ${transactionDetails.currency} = 311657.3 BRL
                        </span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display:flex;gap:16px;justify-content:center;">
                    <div style="flex:1;">
                        <div style="background:#f1f5f9;color:#64748b;padding:14px 24px;border-radius:12px;font-size:16px;font-weight:600;text-align:center;border:2px solid #e2e8f0;">
                            Back
                        </div>
                    </div>
                    <div style="flex:1;">
                        <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="display:block;background:#fbbf24;color:white;padding:14px 24px;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700;text-align:center;box-shadow:0 4px 14px rgba(251,191,36,0.4);transition:all 0.2s;">
                            View Status
                        </a>
                    </div>
                </div>
            </div>

            <!-- Transaction Details -->
            <div style="padding:0 40px 40px;background:white;border-top:1px solid #f1f5f9;">
                <h3 style="color:#1f2937;margin:32px 0 20px;font-size:18px;font-weight:700;">Transaction Details</h3>
                
                <div style="space-y:16px;">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Transaction ID</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:600;font-family:'SF Mono',Monaco,monospace;text-align:right;max-width:200px;word-break:break-all;">${transactionDetails.transactionId}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Hash</span>
                        <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="color:#3b82f6;font-size:14px;font-weight:600;font-family:'SF Mono',Monaco,monospace;text-decoration:none;text-align:right;max-width:200px;word-break:break-all;">
                            ${transactionDetails.transactionHash}
                        </a>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Date</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:600;">${formatDate(transactionDetails.timestamp)}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Network</span>
                        <span style="background:#ef4444;color:white;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;">${transactionDetails.network}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Status</span>
                        <span style="background:#fef2f2;color:#dc2626;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;text-transform:uppercase;">
                            ⬆️ ${transactionDetails.status}
                        </span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f1f5f9;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">Fee</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:700;">${transactionDetails.fee} ${transactionDetails.currency}</span>
                    </div>
                    
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;">
                        <span style="color:#6b7280;font-size:14px;font-weight:500;">ETA</span>
                        <span style="color:#1f2937;font-size:14px;font-weight:700;">${transactionDetails.estimatedArrival || 'Processing...'}</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align:center;padding:32px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                <p style="color:#6b7280;font-size:12px;margin:0 0 8px;font-weight:500;">
                    Powered by <strong style="color:#ef4444;">PLUTUS</strong> Crypto Flash
                </p>
                <p style="color:#9ca3af;font-size:11px;margin:0;line-height:1.4;">
                    © ${new Date().getFullYear()} Plutus. All rights reserved.<br>
                    Transaction ID: ${transactionDetails.transactionId}
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `,
  }

  const res = await transporter.sendMail(mailOptions)
  console.log(res.messageId, res.response)
}
