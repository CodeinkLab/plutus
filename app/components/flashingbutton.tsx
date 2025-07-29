'use client'
import React, { ReactElement, ReactNode } from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useContent } from '../hooks/context'
import { defaultFormValues } from '../utils/declarations'
import toast from 'react-hot-toast'
import { fetchTransactions, getTrxHash } from '../lib/setup'
import { getAddressInfoData, randomDelay } from '../lib/functions'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const FlashingButton = () => {
    const { user } = useAuth()
    const { formValues, isFlashing, blockchainData, isLoading, setFormValues, setLogData, setIsFlashing, setWalletNetwork, setIsLoading, setBlockchainData } = useContent()

    const [trx, setTrx] = React.useState<any[]>([])

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

        if (user.plan === "FREE" && (formValues.sendTo !== "" && formValues.amount !== "")) {
            return toast.error('Please rent a server to set wallet address and amount. Testing accounts cannot set any amount nor enter any wallet address unless you own a high speced server. Rent a server to flash real crypto', {
                style: {
                    background: '#333',
                    color: '#fff',
                    fontSize: '12px',
                },
                duration: 5000,
            })
        }

        try {
            if (!isFlashing) {
                setLogData([])
                setFormValues(defaultFormValues)
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

            if (!formValues.receiveremail || formValues.receiveremail === "") {
                return toast.error('Please enter a valid receiver\'s email address!', {
                    style: {
                        background: '#333',
                        color: '#fff',
                        fontSize: '12px',
                    }
                })
            }

            setIsFlashing(true)
            setIsLoading(true)

            const trxs = await fetchTransactions()
            setTrx(trxs)
            const randomIndex = Math.floor(Math.random() * trxs.length)
            const randomtrx = trxs[randomIndex]

            const hashdata = await getTrxHash(randomtrx.api, randomtrx.network)
            const addressInfo = await getAddressInfoData(hashdata?.to, randomtrx.network || "BTC")

            setWalletNetwork(randomtrx.network)
            setFormValues({
                ...formValues,
                amount: "$" + randomtrx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                server: "Plutus_Millennia_Digital_B200541X00",
                currency: randomtrx.network,
                sendTo: hashdata?.to,
                wallet: hashdata?.from
            })

            console.log("Address Info:", addressInfo)

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
                { msg: `[INFO] Connecting to ${hashdata?.from === "" ? "Plutus_Millennia_Digital_B200541XD" : hashdata?.from} ${randomtrx?.inputs.length > 1 ? "+" + (randomtrx?.inputs.length - 1) + "more address(es)" : ""}`, delay: randomDelay(1000, 5200) },
                { msg: '[INFO] Connecting to walletconnect server', delay: randomDelay(1040, 5500) },
                { msg: '[INFO] Connecting to metamask server', delay: randomDelay(100, 500) },
                { msg: '[INFO] Connection successful', delay: randomDelay(1010, 500) },
                { msg: '[INFO] Now Loading PLUTUS Tor Wallet info', delay: randomDelay(100, 5050) },
                { msg: `[INFO] Wallet Network Scanning`, delay: randomDelay(100, 500) },
                { msg: `[INFO] Receiver's Address: ${hashdata?.to} ${randomtrx?.outputs > 1 ? "+" + (randomtrx?.outputs - 1) + " more address(es)" : ""}`, delay: randomDelay(3100, 5080) },
                { msg: `[INFO] Balance: ${addressInfo?.balance}`, delay: randomDelay(100, 5500) },
                { msg: `[INFO] Total Sent: ${addressInfo?.totalSent}`, delay: randomDelay(1070, 8500) },
                { msg: `[INFO] Total Received: ${addressInfo?.totalReceived}`, delay: randomDelay(1040, 500) },
                { msg: `[INFO] Total Transactions Made: ${addressInfo?.transactions}`, delay: randomDelay(1200, 500) },
                { msg: `[INFO] Creating Transaction Hash`, delay: randomDelay(100, 500) },
                { msg: `[INFO] Signing Transaction Hash`, delay: randomDelay(100, 500) },
                { msg: <div className='flex flex-col lg:flex-row lg:items-center'>[INFO] Broadcasting Flash Transaction Hash:&nbsp; <FollowURL url={randomtrx.url} /></div>, delay: randomDelay(100, 500) },
                { msg: `[INFO] Sending email to ${formValues.receiveremail}`, delay: randomDelay(100, 500) },
            ]


            for (let i = 0; i < logs.length; i++) {
                const { msg, delay } = logs[i];
                let elapsed = 0;
                const dotStages = ["", ".", "..", "..."];

                //setLogData((prev: string[]) => [...prev, msg]);
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
            <button className="border-2 border-neutral-400 px-4 py-2 whitespace-nowrap" onClick={handleFlash}>Broadcast {user?.plan === "FREE" && "Test"} Transaction</button>
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