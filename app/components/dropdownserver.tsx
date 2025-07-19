'use client'
import React from 'react'
import { useActions } from '../utils/actions'

const ServersDropDownComponent = () => {
    const action = useActions()
    return (

        <div className="flex w-full items-center space-x-2 ">
            <label className='text-xs md:text-sm'>Server:</label>
            <div className="flex-1 relative">
                <select className="w-full bg-black px-2 py-1 focus:outline-0 appearance-none text-xs md:text-sm"
                    value={action.formValues.wallet}
                    name="wallet"
                    onChange={action.handleInputChange}>
                    <option disabled value="" className='bg-black disabled:text-green-950'>Select Exchange Server</option>
                    {["Plutus_Millennia_Digital_B200541XD", "sdfassdafdsafsdfsfdf", "sdfsdafssdasdfasd"].map((wallet, index) => (


                        <option className='' key={index} value={wallet}> {wallet} </option>

                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ServersDropDownComponent