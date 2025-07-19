/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'
import React from 'react'
import { useActions } from '../utils/actions'
import { CheckCircleIcon, XCircleIcon, ListBulletIcon, QrCodeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Address= () => {
    const action = useActions()
    return (
        <div className='w-full flex flex-col text-xs md:text-sm gap-4'>
            <div className="w-full flex flex-col md:flex-row items-center gap-4">
                <div className="w-full flex items-center gap-2 md:w-2/3">
                    <label className='whitespace-nowrap'>Send to address:</label>
                    <div className="relative w-full">
                        <input
                            name="sendTo"
                            value={action.formValues.sendTo}
                            onChange={action.handleInputChange}
                            className="bg-black border border-neutral-400 px-2 py-1 focus:outline-1 focus:outline-neutral-300 w-full"
                        />
                        {action.formValues.sendTo && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                {action.walletNetwork ? (
                                    <CheckCircleIcon className="h-5 w-5 text-green-800" />
                                ) : (
                                    <XCircleIcon className="h-5 w-5 text-red-600" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <button disabled={!action.formValues.sendTo} onClick={action.handleCheckAddress} className="border-3 border-neutral-400 px-4 py-1 w-full place-self-end md:w-1/3">Scan Address</button>
            </div>            
        </div>
    )
}

export default Address