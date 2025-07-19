'use client'
import React from 'react'
import { useActions } from '../utils/actions'

const FlashingButton = () => {
    const action = useActions()
    return (
        <div className="flex items-center justify-between w-full gap-8 text-xs md:text-sm">
            <button className="border-2 border-neutral-400 px-4 py-2 whitespace-nowrap" onClick={action.handleFlash}>Broadcast Transaction</button>
            <label className="flex items-center space-x-2 w-full">
                <input
                    type="checkbox"
                    name="flashConfirmed"
                    checked={action.formValues.flashConfirmed}
                    onChange={action.handleInputChange}
                    className='w-4 h-4 accent-green-800'

                />
                <span>Flash 100% Confirmed PLUTUS Server crypto</span>
            </label>
            
        </div>
    )
}

export default FlashingButton