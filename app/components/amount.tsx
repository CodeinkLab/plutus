/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'
import React from 'react'
import { useActions } from '../utils/actions'
import { CheckCircleIcon, XCircleIcon, ListBulletIcon, QrCodeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Amount = () => {
    const action = useActions()
    return (
        <div className='w-full flex flex-col text-xs md:text-sm gap-4'>
           <div className="flex flex-col items-center w-full">
                <div className="w-full flex items-center gap-4">
                    <label className='whitespace-nowrap'>Amount USD:</label>
                    <input
                        disabled={!action.walletNetwork}
                        name="amount"
                        value={action.formValues.amount}
                        max={action.cfdata?.server?.hashrate ?? 100000}
                        onChange={action.handleInputChange}
                        className="bg-black border border-neutral-400 px-2 py-1 focus:outline-1 focus:outline-neutral-300 w-full"
                    />
                    <button disabled={!action.walletNetwork} className="border-2 border-neutral-400 px-2 py-1 w-68 md:whitespace-nowrap" onClick={() => action.setFormValues(prev => ({ ...prev, amount: "$" + (action.cfdata?.server?.hashrate ? action.cfdata?.server?.hashrate : Math.floor(Math.random() * 100000)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }))} >Random amount</button>
                    <button disabled={!action.walletNetwork} className="border-2 border-neutral-400 px-2 py-1 w-20" onClick={() => action.setFormValues(prev => ({ ...prev, amount: "$" + (action.cfdata?.server?.hashrate ?? 100000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }))} >MAX</button>
                </div>
            </div>
        </div>
    )
}

export default Amount