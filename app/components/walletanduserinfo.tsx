'use client'
import React from 'react'
import { useActions } from '../utils/actions'

const WalletAndUserInfo = () => {
    const action = useActions()
    return (
        <div className="flex flex-col w-full text-xs md:text-sm md:max-w-sm">
            {/* Info Panels */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 items-center">
                <div className="relative border border-neutral-400 p-4 h-40">
                    <h3 className="absolute -top-3 left-2 font-extrabold mb-2 bg-black px-2">{action.walletNetwork} Wallet Info</h3>
                    {action.blockchainData && !action.isLoading && (
                        <div className='flex flex-col gap-2'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className="flex flex-col">
                                    <p className="text-base  font-bold">Balance</p>
                                    <div className="flex flex-col">
                                        <p className='text-xs md:text-sm font-bold'>{action.blockchainData.usd}</p>
                                        <p className='text-xs'>{action.blockchainData.balance}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-bold">Transactions</p>
                                    <div className="flex flex-col">
                                        <p className='text-xs md:text-sm font-bold'>{action.blockchainData.transactions} times</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-base font-bold">Total Sent</p>
                                    <div className="flex flex-col">
                                        <p className='text-xs md:text-sm font-bold'>{action.blockchainData.totalSentUSD}</p>
                                        <p className='text-xs'>{action.blockchainData.totalSent}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-base font-bold">Total Received</p>
                                    <div className="flex flex-col">
                                        <p className='text-xs md:text-sm font-bold'>{action.blockchainData.totalReceivedUSD}</p>
                                        <p className='text-xs'>{action.blockchainData.totalReceived}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                    {!action.blockchainData && !action.isLoading && (
                        <p className="my-4 text-center">No data provided yet</p>
                    )}
                    {action.isLoading && (
                        <div className="flex justify-center items-center my-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-800"></div>
                        </div>
                    )}
                </div>
                <div suppressHydrationWarning className="flex flex-col gap-1.5 relative border border-neutral-400 h-40 p-4">
                    <h3 className="absolute -top-3 left-2 font-extrabold mb-2 bg-black px-2">Client Info</h3>
                    <div className="flex space-x-2">
                        
                    </div>
                    
                </div>
            </div>
        </div>

    )
}

export default WalletAndUserInfo