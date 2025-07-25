/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react'
import { useActions } from '../utils/actions'

const AdvancedOption = () => {
    const action = useActions()
    return (
        <div className="relative border border-neutral-400 p-4 w-full text-xs md:text-sm">
            <h2 className="absolute -top-3 left-4 font-extrabold mb-2 bg-black px-2">Advanced Options</h2>
            <div className="flex space-x-8 mb-2">
                <div className="flex flex-col space-x-2 mb-2 w-full">
                    <div className='flex items-center space-x-2 mt-1'>
                        <input
                            type="checkbox"
                            name="customizeFee"
                            checked={action.formValues.customizeFee}
                            onChange={action.handleInputChange}
                            className='w-4 h-4 accent-green-800'
                        />
                        <label>Customize transaction fee</label>
                    </div>
                    <div className='flex items-center mt-2 w-full'>
                        <input
                            name="transactionFee"
                            value={action.formValues.transactionFee}
                            onChange={action.handleInputChange}
                            className="bg-black border-2 border-neutral-400 px-2 focus:outline-1 focus:outline-neutral-300 w-full text-right text-neutral-500"
                        />
                        <span className='border border-neutral-400 px-2'>sat/byte</span>
                    </div>
                </div>
                <div className="flex flex-col space-x-2 mb-2 w-full">
                    <label>Receiver's Email Address</label>
                    <div className='flex items-center mt-2 w-full'>
                        <input
                            name="receiveremail"
                            value={action.formValues.receiveremail}
                            onChange={action.handleInputChange}
                            className="bg-black border border-neutral-400 px-2 py-1 focus:outline-1 focus:outline-neutral-300 w-full pr-10"
                        />
                    </div>
                </div>
            </div>

            <div className="relative flex items-center space-x-2 mb-2 border border-neutral-400 mt-6 -mr-4 bg-black ring-6 ring-black">
                <div className='absolute -top-3 -left-0.5 bg-black pr-2 pb-2 flex items-center space-x-2 z-10'>
                    <input
                        type="checkbox"
                        name="randomDelay"
                        checked={action.formValues.randomDelay}
                        onChange={action.handleInputChange}
                        className='w-4 h-4 accent-green-800'
                    />
                    <label>Set randomized delay (hours)</label>
                </div>

                <div className='flex flex-col w-full mt-6 px-2'>
                    <div className='flex items-center space-x-2 '>
                        <span>Min delay:</span>
                        <input
                            name="minDelay"
                            value={action.formValues.randomDelay ? action.formValues.minDelay : ""}
                            onChange={action.handleInputChange}
                            disabled={!action.formValues.randomDelay}
                            className="bg-black border border-neutral-400 px-2 py-1 w-12 h-6 focus:outline-1 focus:outline-neutral-300"
                        />
                        <div className="w-12"></div>
                        <span>Max delay:</span>
                        <input
                            name="maxDelay"
                            value={action.formValues.randomDelay ? action.formValues.maxDelay : ""}
                            onChange={action.handleInputChange}
                            disabled={!action.formValues.randomDelay}
                            className="bg-black border border-neutral-400 px-2 py-1 w-12 h-6 focus:outline-1 focus:outline-neutral-300"
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <div className='flex items-center space-x-2 '>
                            <div>
                                <input
                                    className='w-4 h-4 accent-green-800'
                                    type="radio"
                                    name="proxyType"
                                    value="noProxy"
                                    checked={action.formValues.proxyType === "noProxy"}
                                    onChange={action.handleInputChange}
                                    disabled={!action.formValues.randomDelay}
                                /> Don't use proxy
                            </div>
                            <div className='w-12'></div>
                            <div>
                                <input
                                    className='w-4 h-4 accent-green-800'
                                    type="radio"
                                    name="proxyType"
                                    value="vip72"
                                    checked={action.formValues.proxyType === "vip72"}
                                    onChange={action.handleInputChange}
                                    disabled={!action.formValues.randomDelay}
                                /> Socks by VIP72
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-x-2 mt-2">
                        <div className='flex items-center space-x-2 '>
                            <input
                                className='w-4 h-4 accent-green-800'
                                type="radio"
                                name="proxyType"
                                value="random"
                                checked={action.formValues.proxyType === "random"}
                                onChange={action.handleInputChange}
                                disabled={!action.formValues.randomDelay}
                            /> <p>Use Random Proxy</p>
                        </div>
                        <div className="flex my-3 mx-4 gap-8 items-center">
                            <select
                                name="selectedProxy"
                                value={action.formValues.randomDelay ? action.formValues.selectedProxy : ""}
                                onChange={action.handleInputChange}
                                disabled={!action.formValues.randomDelay}
                                className="w-1/2 bg-black border border-neutral-400 px-2 py-1">
                                <option value="RDP/VPS">RDP/VPS</option>
                                <option value="VPN">VPN</option>
                                <option value="Proxy">Proxy</option>
                            </select>

                            <input
                                name="blockchainApi"
                                value={action.formValues.randomDelay ? action.formValues.blockchainApi : ""}
                                onChange={action.handleInputChange}
                                disabled={!action.formValues.randomDelay}
                                className="bg-black border-2 border-neutral-400 px-2 h-8 w-full focus:outline-1 focus:outline-neutral-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvancedOption