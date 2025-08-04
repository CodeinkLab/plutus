'use client'
import React from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useContent } from '../hooks/context'
import toast from 'react-hot-toast'
import { fetchTransactions, getTrxHash } from '../lib/setup'
import { getAddressInfoData, randomDelay } from '../lib/functions'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const FlashingButton = () => {
    const { user } = useAuth()
    const { formValues, isFlashing, setFormValues, setLogData, setIsFlashing, setWalletNetwork, setIsLoading, setBlockchainData } = useContent()

    const [_trx, setTrx] = React.useState<any[]>([])

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        })

    }

    const handleFlash = async () => {
        if (!user) {
            return toast.error('You need to be logged in to perform this action.', {
                style: {
                    background: '#333',
                    color: '#fff',
                    fontSize: '12px',
                }
            })
        }

        if (!formValues.receiveremail || formValues.receiveremail === "") {
            return toast.error('Please enter a valid receiver\'s email address!', {
                style: {
                    background: '#333',
                    color: '#fff',
                    fontSize: '12px',
                }
            })
        }

        if (isFlashing) {
            return toast.error('Flash is already in progress!', {
                style: {
                    background: '#333',
                    color: '#fff',
                    fontSize: '12px',
                }
            })
        }

        try {
            setIsFlashing(true)
            setIsLoading(true)
            setLogData([])

            // For FREE users, check if they can still make transactions
            if (user.plan === "FREE") {
                // Show warning about limitations
                toast('Free trial detected. You have 3 total trials to test the system.', {
                    style: {
                        background: '#f59e0b',
                        color: '#fff',
                        fontSize: '12px',
                    },
                    duration: 3000,
                })
            }

            // Check transaction limit for FREE users
            if (user.plan === "FREE") {
                try {
                    const limitResponse = await fetch('/api/transactions/check-limit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id
                        }),
                    });

                    const limitResult = await limitResponse.json();

                    if (!limitResult.success) {
                        setIsFlashing(false);
                        setIsLoading(false);

                        if (limitResult.type === 'LIMIT_REACHED') {
                            toast.error('Free trial limit reached! You have used all 3 free trials. Rent a server for unlimited real transactions.', {
                                style: {
                                    background: '#ef4444',
                                    color: '#fff',
                                    fontSize: '12px',
                                },
                                duration: 7000,
                            });
                        } else {
                            toast.error(limitResult.error, {
                                style: {
                                    background: '#ef4444',
                                    color: '#fff',
                                    fontSize: '12px',
                                }
                            });
                        }
                        return;
                    }

                    // Show remaining trials
                    if (limitResult.remainingTransactions !== null) {
                        toast(`${limitResult.remainingTransactions} free trials remaining after this transaction.`, {
                            style: {
                                background: '#f59e0b',
                                color: '#fff',
                                fontSize: '12px',
                            },
                            duration: 3000,
                        });
                    }
                } catch (error) {
                    console.error('Error checking transaction limit:', error);
                    setIsFlashing(false);
                    setIsLoading(false);
                    toast.error('Unable to verify transaction limit. Please try again.', {
                        style: {
                            background: '#ef4444',
                            color: '#fff',
                            fontSize: '12px',
                        }
                    });
                    return;
                }
            }

            const trxs = await fetchTransactions()
            setTrx(trxs)

            console.log('Fetched transactions:', trxs)
            const randomIndex = Math.floor(Math.random() * trxs.length)
            const randomtrx = trxs[randomIndex]

            console.log('Selected random transaction:', randomtrx)

            const hashdata = await getTrxHash(randomtrx.api, randomtrx.network)
            const addressInfo = await getAddressInfoData(hashdata?.to, randomtrx.network || "BTC")

            // For paid users, allow custom wallet and amount
            // For free users, use random data for testing
            const transactionAmount = user.plan === "FREE"
                ? randomtrx.amount
                : formValues.amount ? parseFloat(formValues.amount.replace('$', '').replace(',', '')) : randomtrx.amount;

            const senderWallet = user.plan === "FREE" || !formValues.wallet
                ? hashdata?.from
                : formValues.wallet;

            const receiverWallet = user.plan === "FREE" || !formValues.sendTo
                ? hashdata?.to
                : formValues.sendTo;

            // Update form values for display
            setWalletNetwork(randomtrx.network)
            setFormValues({
                ...formValues,
                amount: "$" + transactionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                server: "Plutus_Millennia_Digital_B200541X00",
                currency: randomtrx.network,
                sendTo: receiverWallet,
                wallet: senderWallet
            })

            setBlockchainData({
                balance: addressInfo?.balance || "Unknown",
                totalSent: addressInfo?.totalSent || "Unknown",
                totalReceived: addressInfo?.totalReceived || "Unknown",
                transactions: addressInfo?.transactions || "0",
                totalReceivedUSD: addressInfo?.totalReceivedUSD || "0",
                totalSentUSD: addressInfo?.totalSentUSD || "0",
                firstSeen: addressInfo?.firstSeen || "Unknown"
            })

            setIsLoading(false)

            const FollowURL = ({ url }: { url: string }): React.JSX.Element => {
                return <div className="flex gap-1 items-center group">
                    <Link href={url} className='hover:text-blue-600 transition-colors ease-in-out duration-300 delay-150 group-hover:cursor-pointer break-all' target='_blank'>{randomtrx?.hash}</Link>
                    <ExternalLink className='group-hover:cursor-pointer transition-colors ease-in-out duration-300 delay-150 group-hover:text-blue-600 size-4' />
                </div>
            }

            const logs = [
                { msg: '[INFO] Hydra CF (PLUTUS) 5.0.0.0', delay: randomDelay(100, 500) },
                { msg: `[INFO] Copyright (C) ${new Date().getFullYear()}, Telegram : https://t.me/+ASKffwowFvEyYjFk`, delay: randomDelay(100, 5000) },
                { msg: '[INFO] Plutus network loading', delay: randomDelay(100, 500) },
                { msg: '[INFO] Connecting to network starting', delay: randomDelay(100, 5100) },
                { msg: '[INFO] Connecting to plutus api', delay: randomDelay(100, 500) },
                { msg: `[INFO] Connecting to ${senderWallet === "" ? "Plutus_Millennia_Digital_B200541XD" : senderWallet} ${randomtrx?.inputs.length > 1 ? "+" + (randomtrx?.inputs.length - 1) + "more address(es)" : ""}`, delay: randomDelay(1000, 5200) },
                { msg: '[INFO] Connecting to walletconnect server', delay: randomDelay(1040, 5500) },
                { msg: '[INFO] Connecting to metamask server', delay: randomDelay(100, 500) },
                { msg: '[INFO] Connection successful', delay: randomDelay(1010, 500) },
                { msg: '[INFO] Now Loading PLUTUS Tor Wallet info', delay: randomDelay(100, 5050) },
                { msg: `[INFO] Wallet Network Scanning`, delay: randomDelay(100, 500) },
                { msg: `[INFO] Receiver's Address: ${receiverWallet} ${randomtrx?.outputs > 1 ? "+" + (randomtrx?.outputs - 1) + " more address(es)" : ""}`, delay: randomDelay(3100, 5080) },
                { msg: `[INFO] Balance: ${addressInfo?.balance}`, delay: randomDelay(100, 5500) },
                { msg: `[INFO] Total Sent: ${addressInfo?.totalSent}`, delay: randomDelay(1070, 8500) },
                { msg: `[INFO] Total Received: ${addressInfo?.totalReceived}`, delay: randomDelay(1040, 500) },
                { msg: `[INFO] Total Transactions Made: ${addressInfo?.transactions}`, delay: randomDelay(1200, 500) },
                { msg: `[INFO] Creating Transaction Hash`, delay: randomDelay(100, 500) },
                { msg: `[INFO] Signing Transaction Hash`, delay: randomDelay(100, 500) },
                { msg: <div className='flex flex-col lg:flex-row lg:items-center'>[INFO] Broadcasting Flash Transaction Hash:&nbsp; <FollowURL url={randomtrx.url} /></div>, delay: randomDelay(100, 500) },
                { msg: `[INFO] Sending email receipts`, delay: randomDelay(100, 500) },
            ]

            // Execute log animation
            for (let i = 0; i < logs.length; i++) {
                const { msg, delay } = logs[i];
                let elapsed = 0;
                const dotStages = ["", ".", "..", "..."];

                setLogData([...logs.slice(0, i).map(log => log.msg), msg]);

                while (elapsed < delay) {
                    for (const dots of dotStages) {
                        if (elapsed >= delay) break;

                        setLogData([...logs.slice(0, i).map(log => log.msg), `${msg}${dots}`]);

                        await new Promise(res => setTimeout(res, 300));
                        elapsed += 300;
                    }
                }
                setLogData([...logs.slice(0, i).map(log => log.msg), msg]);

                await new Promise(res => setTimeout(res, 100));
            }

            try {
                const transactionResponse = await fetch('/api/transactions/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: transactionAmount,
                        currency: randomtrx.network,
                        senderAddress: senderWallet,
                        receiverAddress: receiverWallet,
                        receiverEmail: formValues.receiveremail,
                        transactionHash: randomtrx.hash,
                        url: randomtrx.url,
                        network: randomtrx.network,
                        blockHeight: Math.floor(Math.random() * 1000000) + 800000,
                        confirmations: 6,
                        fee: transactionAmount * 0.001, // 0.1% fee
                        gasUsed: randomtrx.network === 'ETH' ? Math.floor(Math.random() * 50000) + 21000 : undefined,
                        gasPrice: randomtrx.network === 'ETH' ? `${Math.floor(Math.random() * 50) + 20} gwei` : undefined,
                        inputs: randomtrx.inputs || 1,
                        outputs: randomtrx.outputs || 1,
                        size: Math.floor(Math.random() * 1000) + 250,
                        weight: Math.floor(Math.random() * 4000) + 1000,
                        blockTime: new Date().toISOString(),
                    }),
                });

                const result = await transactionResponse.json();

                if (result.success) {
                    const currentLogs = [...logs.slice(0, logs.length).map(log => log.msg)];
                    setLogData([...currentLogs, '[SUCCESS] Transaction saved and email receipts sent!']);

                    if (result.transaction.remainingTransactions !== null) {
                        setLogData([...currentLogs, '[SUCCESS] Transaction saved and email receipts sent!', `[INFO] Remaining free trials: ${result.transaction.remainingTransactions}`]);
                    }

                    toast.success(`Transaction completed successfully!${result.transaction.remainingTransactions !== null ? ` ${result.transaction.remainingTransactions} free trials remaining.` : ''}`, {
                        style: {
                            background: '#10b981',
                            color: '#fff',
                            fontSize: '12px',
                        },
                        duration: 5000,
                    });
                } else {
                    const currentLogs = [...logs.slice(0, logs.length).map(log => log.msg)];
                    setLogData([...currentLogs, `[ERROR] ${result.error}`]);

                    if (result.type === 'LIMIT_REACHED') {
                        toast.error('Free trial limit reached! You have used all 3 free trials. Rent a server for unlimited real transactions.', {
                            style: {
                                background: '#ef4444',
                                color: '#fff',
                                fontSize: '12px',
                            },
                            duration: 7000,
                        });
                    } else if (result.type === 'AMOUNT_EXCEEDED') {
                        toast.error('Transaction amount exceeds your plan limit. Please upgrade your server plan.', {
                            style: {
                                background: '#ef4444',
                                color: '#fff',
                                fontSize: '12px',
                            },
                            duration: 7000,
                        });
                    } else {
                        toast.error(result.error, {
                            style: {
                                background: '#ef4444',
                                color: '#fff',
                                fontSize: '12px',
                            }
                        });
                    }
                }
            } catch (dbError) {
                console.error('Database transaction error:', dbError);
                const currentLogs = [...logs.slice(0, logs.length).map(log => log.msg)];
                setLogData([...currentLogs, '[ERROR] Failed to save transaction to database']);
                toast.error('Transaction processing failed. Please try again.', {
                    style: {
                        background: '#ef4444',
                        color: '#fff',
                        fontSize: '12px',
                    }
                });
            }

            setIsFlashing(false)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error during flash:', error);
            setIsFlashing(false)
            toast.error('An error occurred while processing the flash transaction. Try Again Later', {
                style: {
                    background: '#333',
                    color: '#fff',
                    fontSize: '12px',
                }
            });
        }
    }

    return (
        <div className="flex items-center justify-between w-full gap-8 text-xs md:text-sm">
            <button className="border-2 px-4 py-2 whitespace-nowrap transition-colors border-neutral-400"
                onClick={handleFlash}
                disabled={isFlashing}
            >
                {isFlashing ? 'Processing...' :
                    user?.plan === "FREE" ? 'Test Transaction (FREE)' :
                        'Flash Real Transaction'}
            </button>
            <label className="flex items-center space-x-2 w-full">
                <input
                    type="checkbox"
                    name="flashConfirmed"
                    checked={formValues.flashConfirmed}
                    onChange={handleInputChange}
                    className='w-4 h-4 accent-green-800'
                />
                <span>Flash 100% Confirmed PLUTUS Server crypto</span>

            </label>
        </div>
    )
}

export default FlashingButton