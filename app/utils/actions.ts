'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { BlockchainData, FormValues } from "./interfaces"
import { defaultFormValues } from "./declarations"
import { useDialog } from "@/app/lib/dialog"

export const useActions = () => {
    const dialog = useDialog()
    const [formValues, setFormValues] = useState<FormValues>(defaultFormValues)
    const [isOnline, setIsOnline] = useState(true)
    const [cfdata, setCfdata] = useState<any>(null)
    const [walletNetwork, setWalletNetwork] = useState<string | null>(null)
    const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        //console.log(name, value, type)
        if (type === 'checkbox') {
            setFormValues(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked
            }))
        } else {
            setFormValues(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }




    const handleCheckAddress = async () => {

    }

    const handleFlash = async () => {

    }

    return {
        formValues,
        isOnline,
        walletNetwork,
        cfdata,
        blockchainData,
        isLoading,


        setIsLoading,
        setBlockchainData,
        setIsOnline,
        setWalletNetwork,
        setCfdata,
        setFormValues,
        handleInputChange,
        handleCheckAddress,
        handleFlash
    }
}