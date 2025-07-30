import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: true,
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
          <img src="https://plutus.uno/img.png" alt="Plutus Logo" style="max-width: 200px;">
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome to Plutus!</h1>
          
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Thank you for signing up. Please verify your email address to get started:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #03380d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verify Email
            </a>
          </div>
          
          
          <p style="color: #666; font-size: 14px;">
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
            <a href="${resetUrl}" 
               style="background-color: #01941c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This password reset link will expire in 1 hour. If you didn't request this, please ignore this email.
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
            © ${new Date().getFullYear()} BigBoysTips. All rights reserved.<br>
            If you didn't request this password reset, you can safely ignore this email.
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
    subject: `💰 DEPOSIT CONFIRMED: +${transactionDetails.amount} ${transactionDetails.currency} | PLUTUS`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deposit Confirmed - PLUTUS</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    
    <!-- Preheader -->
    <div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Your deposit of ${transactionDetails.amount} ${transactionDetails.currency} has been successfully processed and confirmed on the ${transactionDetails.network} network.
    </div>

    <!-- Main Container -->
    <div style="width:100%;background:#0a0a0a;padding:40px 0;">
        <div style="max-width:600px;margin:0 auto;background:#0a0a0a;">
            
            <!-- Header -->
            <div style="text-align:center;padding:0 20px 40px;">
                <div style="display:inline-block;background:linear-gradient(45deg,#10b981,#059669);padding:16px;border-radius:50%;margin-bottom:20px;box-shadow:0 8px 32px rgba(16,185,129,0.4);">
                    <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;letter-spacing:-0.5px;">PLUTUS</h1>
                <p style="color:#6b7280;margin:8px 0 0;font-size:14px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">CRYPTO FLASH SYSTEM</p>
            </div>

            <!-- Main Card -->
            <div style="margin:0 20px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.8);">
                
                <!-- Status Header -->
                <div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);padding:40px 30px;text-align:center;position:relative;">
                    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=');opacity:0.3;"></div>
                    
                    <div style="position:relative;z-index:2;">
                        <div style="background:rgba(255,255,255,0.2);width:80px;height:80px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);">
                            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h2 style="color:white;font-size:32px;font-weight:900;margin:0 0 8px;text-shadow:0 2px 4px rgba(0,0,0,0.3);">DEPOSIT CONFIRMED</h2>
                        <p style="color:rgba(255,255,255,0.9);margin:0;font-size:16px;font-weight:500;">Successfully processed on ${transactionDetails.network} network</p>
                        
                        <div style="margin-top:24px;">
                            <span style="background:rgba(255,255,255,0.25);color:white;padding:8px 20px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;backdrop-filter:blur(10px);">
                                ✓ ${transactionDetails.status}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Amount Section -->
                <div style="padding:0;background:linear-gradient(180deg,#f0fdf4 0%,#ffffff 100%);">
                    <div style="padding:40px 30px;text-align:center;">
                        <div style="background:linear-gradient(135deg,#dcfce7,#f0fdf4);border:3px solid #10b981;border-radius:16px;padding:32px;position:relative;overflow:hidden;box-shadow:0 10px 25px rgba(16,185,129,0.15);">
                            <!-- Animated Corner -->
                            <div style="position:absolute;top:12px;right:12px;width:8px;height:8px;background:#10b981;border-radius:50%;"></div>
                            
                            <div style="font-size:56px;font-weight:900;color:#059669;margin-bottom:8px;line-height:1;">
                                +${parseFloat(transactionDetails.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                            </div>
                            <div style="font-size:28px;color:#047857;font-weight:800;letter-spacing:2px;margin-bottom:16px;">
                                ${transactionDetails.currency}
                            </div>
                            <div style="background:rgba(5,150,105,0.1);color:#047857;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;">
                                INSTANT SETTLEMENT
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Transaction Details -->
                <div style="padding:0 30px 40px;background:white;">
                    <div style="background:#f9fafb;border-radius:12px;padding:24px;border:1px solid #e5e7eb;box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                        <h3 style="color:#111827;margin:0 0 24px;font-size:18px;font-weight:800;display:flex;align-items:center;">
                            <span style="background:linear-gradient(45deg,#10b981,#059669);width:4px;height:20px;border-radius:2px;margin-right:12px;"></span>
                            TRANSACTION DETAILS
                        </h3>
                        
                        <div style="background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
                            <table style="width:100%;border-collapse:collapse;">
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;width:120px;vertical-align:top;">TXN ID</td>
                                    <td style="padding:16px;color:#111827;font-size:13px;font-family:'SF Mono',Monaco,monospace;font-weight:600;word-break:break-all;">${transactionDetails.transactionId}</td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">HASH</td>
                                    <td style="padding:16px;color:#111827;font-size:13px;font-family:'SF Mono',Monaco,monospace;font-weight:600;word-break:break-all;">
                                        <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="color:#059669;text-decoration:none;border-bottom:1px solid #10b981;transition:all 0.2s;">
                                            ${transactionDetails.transactionHash}
                                        </a>
                                    </td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;">DATE</td>
                                    <td style="padding:16px;color:#111827;font-size:13px;font-weight:600;">${formatDate(transactionDetails.timestamp)}</td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;">NETWORK</td>
                                    <td style="padding:16px;">
                                        <span style="background:#10b981;color:white;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;">${transactionDetails.network}</span>
                                    </td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">FROM</td>
                                    <td style="padding:16px;">
                                        <div style="background:#f9fafb;padding:8px;border-radius:6px;font-family:'SF Mono',Monaco,monospace;font-size:12px;color:#374151;word-break:break-all;border:1px solid #e5e7eb;">
                                            ${transactionDetails.fromAddress}
                                        </div>
                                    </td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">TO</td>
                                    <td style="padding:16px;">
                                        <div style="background:#f0fdf4;padding:8px;border-radius:6px;font-family:'SF Mono',Monaco,monospace;font-size:12px;color:#374151;word-break:break-all;border:1px solid #dcfce7;">
                                            ${transactionDetails.toAddress}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;">STATUS</td>
                                    <td style="padding:16px;">
                                        <span style="background:#10b981;color:white;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;">${transactionDetails.confirmations}/6 CONFIRMED</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div style="text-align:center;margin-top:24px;">
                            <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#10b981,#059669);color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;box-shadow:0 4px 14px rgba(16,185,129,0.4);transition:all 0.2s;">
                                🔍 VIEW ON BLOCKCHAIN
                            </a>
                        </div>
                    </div>

                    <!-- Security Alert -->
                    <div style="background:linear-gradient(135deg,#fef3c7,#fef9e7);border:1px solid #f59e0b;border-radius:8px;padding:16px;margin-top:20px;box-shadow:0 3px 10px rgba(245,158,11,0.15);">
                        <div style="display:flex;align-items:flex-start;">
                            <div style="color:#d97706;margin-right:12px;font-size:18px;">⚠️</div>
                            <div>
                                <h4 style="color:#92400e;margin:0 0 4px;font-size:14px;font-weight:700;">SECURITY REMINDER</h4>
                                <p style="margin:0;color:#b45309;font-size:12px;line-height:1.5;">
                                    Always verify transactions on the blockchain explorer. Keep this receipt secure. Never share private keys.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align:center;padding:40px 20px 0;">
                <div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-radius:12px;padding:24px;border:1px solid rgba(255,255,255,0.1);">
                    <p style="color:#9ca3af;font-size:13px;margin:0 0 12px;font-weight:500;">
                        Powered by <strong style="color:#10b981;">PLUTUS</strong> • Advanced Crypto Flash Technology
                    </p>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;">
                        <p style="color:#6b7280;font-size:11px;margin:0;line-height:1.4;">
                            © ${new Date().getFullYear()} Plutus. All rights reserved. | ID: ${transactionDetails.transactionId}<br>
                            This is an automated message. Do not reply to this email.
                        </p>
                    </div>
                </div>
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
    subject: `⚡ WITHDRAWAL SENT: -${transactionDetails.amount} ${transactionDetails.currency} | PLUTUS`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Processed - PLUTUS</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    
    <!-- Preheader -->
    <div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
        Your withdrawal of ${transactionDetails.amount} ${transactionDetails.currency} has been successfully processed and broadcast to the ${transactionDetails.network} network.
    </div>

    <!-- Main Container -->
    <div style="width:100%;background:#0a0a0a;padding:40px 0;">
        <div style="max-width:600px;margin:0 auto;background:#0a0a0a;">
            
            <!-- Header -->
            <div style="text-align:center;padding:0 20px 40px;">
                <div style="display:inline-block;background:linear-gradient(45deg,#ef4444,#dc2626);padding:16px;border-radius:50%;margin-bottom:20px;box-shadow:0 8px 32px rgba(239,68,68,0.4);">
                    <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;letter-spacing:-0.5px;">PLUTUS</h1>
                <p style="color:#6b7280;margin:8px 0 0;font-size:14px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">CRYPTO FLASH SYSTEM</p>
            </div>

            <!-- Main Card -->
            <div style="margin:0 20px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.8);">
                
                <!-- Status Header -->
                <div style="background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);padding:40px 30px;text-align:center;position:relative;">
                    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=');opacity:0.3;"></div>
                    
                    <div style="position:relative;z-index:2;">
                        <div style="background:rgba(255,255,255,0.2);width:80px;height:80px;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);">
                            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                                <path d="M7,14L12,9L17,14H7Z"/>
                                <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z"/>
                            </svg>
                        </div>
                        <h2 style="color:white;font-size:32px;font-weight:900;margin:0 0 8px;text-shadow:0 2px 4px rgba(0,0,0,0.3);">WITHDRAWAL SENT</h2>
                        <p style="color:rgba(255,255,255,0.9);margin:0;font-size:16px;font-weight:500;">Successfully broadcast to ${transactionDetails.network} network</p>
                        
                        <div style="margin-top:24px;">
                            <span style="background:rgba(255,255,255,0.25);color:white;padding:8px 20px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;backdrop-filter:blur(10px);">
                                ✓ ${transactionDetails.status}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Amount Section -->
                <div style="padding:0;background:linear-gradient(180deg,#fef2f2 0%,#ffffff 100%);">
                    <div style="padding:40px 30px;text-align:center;">
                        <div style="background:linear-gradient(135deg,#fecaca,#fef2f2);border:3px solid #ef4444;border-radius:16px;padding:32px;position:relative;overflow:hidden;box-shadow:0 10px 25px rgba(239,68,68,0.15);">
                            <!-- Animated Corner -->
                            <div style="position:absolute;top:12px;right:12px;width:8px;height:8px;background:#ef4444;border-radius:50%;"></div>
                            
                            <div style="font-size:56px;font-weight:900;color:#dc2626;margin-bottom:8px;line-height:1;">
                                -${parseFloat(transactionDetails.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                            </div>
                            <div style="font-size:28px;color:#b91c1c;font-weight:800;letter-spacing:2px;margin-bottom:16px;">
                                ${transactionDetails.currency}
                            </div>
                            <div style="background:rgba(220,38,38,0.1);color:#b91c1c;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:700;display:inline-block;">
                                ${transactionDetails.estimatedArrival ? `ETA: ${transactionDetails.estimatedArrival}` : 'PROCESSING...'}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Transaction Details -->
                <div style="padding:0 30px 40px;background:white;">
                    <div style="background:#f9fafb;border-radius:12px;padding:24px;border:1px solid #e5e7eb;box-shadow:0 4px 15px rgba(0,0,0,0.05);">
                        <h3 style="color:#111827;margin:0 0 24px;font-size:18px;font-weight:800;display:flex;align-items:center;">
                            <span style="background:linear-gradient(45deg,#ef4444,#dc2626);width:4px;height:20px;border-radius:2px;margin-right:12px;"></span>
                            TRANSACTION DETAILS
                        </h3>
                        
                        <div style="background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
                            <table style="width:100%;border-collapse:collapse;">
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;width:120px;vertical-align:top;">TXN ID</td>
                                    <td style="padding:16px;color:#111827;font-size:13px;font-family:'SF Mono',Monaco,monospace;font-weight:600;word-break:break-all;">${transactionDetails.transactionId}</td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">HASH</td>
                                    <td style="padding:16px;color:#111827;font-size:13px;font-family:'SF Mono',Monaco,monospace;font-weight:600;word-break:break-all;">
                                        <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="color:#dc2626;text-decoration:none;border-bottom:1px solid #ef4444;transition:all 0.2s;">
                                            ${transactionDetails.transactionHash}
                                        </a>
                                    </td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;">DATE</td>
                                    <td style="padding:16px;color:#111827;font-size:13px;font-weight:600;">${formatDate(transactionDetails.timestamp)}</td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;">NETWORK</td>
                                    <td style="padding:16px;">
                                        <span style="background:#ef4444;color:white;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;">${transactionDetails.network}</span>
                                    </td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">FROM</td>
                                    <td style="padding:16px;">
                                        <div style="background:#fef2f2;padding:8px;border-radius:6px;font-family:'SF Mono',Monaco,monospace;font-size:12px;color:#374151;word-break:break-all;border:1px solid #fecaca;">
                                            ${transactionDetails.fromAddress}
                                        </div>
                                    </td>
                                </tr>
                                <tr style="border-bottom:1px solid #f3f4f6;">
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;vertical-align:top;">TO</td>
                                    <td style="padding:16px;">
                                        <div style="background:#f9fafb;padding:8px;border-radius:6px;font-family:'SF Mono',Monaco,monospace;font-size:12px;color:#374151;word-break:break-all;border:1px solid #e5e7eb;">
                                            ${transactionDetails.toAddress}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:16px;color:#6b7280;font-size:13px;font-weight:600;">FEE</td>
                                    <td style="padding:16px;">
                                        <span style="background:#f59e0b;color:white;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;">${transactionDetails.fee} ${transactionDetails.currency}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div style="text-align:center;margin-top:24px;">
                            <a href="${getExplorerUrl(transactionDetails.transactionHash, transactionDetails.network)}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#ef4444,#dc2626);color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:13px;box-shadow:0 4px 14px rgba(239,68,68,0.4);transition:all 0.2s;">
                                🔍 TRACK TRANSACTION
                            </a>
                        </div>
                    </div>

                    <!-- Tracking Alert -->
                    <div style="background:linear-gradient(135deg,#dbeafe,#eff6ff);border:1px solid #3b82f6;border-radius:8px;padding:16px;margin-top:20px;box-shadow:0 3px 10px rgba(59,130,246,0.15);">
                        <div style="display:flex;align-items:flex-start;">
                            <div style="color:#1d4ed8;margin-right:12px;font-size:18px;">⚡</div>
                            <div>
                                <h4 style="color:#1e40af;margin:0 0 4px;font-size:14px;font-weight:700;">TRANSACTION TRACKING</h4>
                                <p style="margin:0;color:#2563eb;font-size:12px;line-height:1.5;">
                                    Monitor your withdrawal progress on the blockchain explorer. Network confirmations typically take 10-60 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="text-align:center;padding:40px 20px 0;">
                <div style="background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-radius:12px;padding:24px;border:1px solid rgba(255,255,255,0.1);">
                    <p style="color:#9ca3af;font-size:13px;margin:0 0 12px;font-weight:500;">
                        Powered by <strong style="color:#ef4444;">PLUTUS</strong> • Advanced Crypto Flash Technology
                    </p>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;">
                        <p style="color:#6b7280;font-size:11px;margin:0;line-height:1.4;">
                            © ${new Date().getFullYear()} Plutus. All rights reserved. | ID: ${transactionDetails.transactionId}<br>
                            This is an automated message. Do not reply to this email.
                        </p>
                    </div>
                </div>
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
