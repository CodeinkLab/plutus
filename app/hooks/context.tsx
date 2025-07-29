/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { ContentData, DialogState, PriceData } from "../utils/interfaces";
import { BlockchainAddressData, BlockchainData, FormValues, Transaction } from "../utils/interfaces"
import { defaultFormValues } from "../utils/declarations";
import io from "socket.io-client";
import { SigninForm } from "../components/auth/SigninForm";
import { SignupForm } from "../components/auth/SignupForm";
import { useDialog } from "../lib/dialog";




const ContentContext = createContext<ContentData | undefined>(undefined);
const stateObj: DialogState = {
    isOpen: false,
    type: 'alert',
    title: '',
    message: '',
    component: null,
    controls: true,
}

export function ContentProvider({ children }: { children: ReactNode }) {
    const [prices, setPrices] = useState<PriceData[]>([])
    const [formValues, setFormValues] = useState<FormValues>(defaultFormValues)
    const [isOnline, setIsOnline] = useState(true)
    const [cfdata, setCfdata] = useState<any>(null)
    const [walletNetwork, setWalletNetwork] = useState<string | null>(null)
    const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [logData, setLogData] = useState<string[]>([]);
    const [multiTransactions, setMultiTransactions] = useState<any>(null);
    const [isSignin, setIsSignin] = useState(true)
    const [isFlashing, setIsFlashing] = useState(false)

    const [state, setState] = useState<DialogState>(stateObj)




    /* const socket = io("", {
        path: "/api/socket",
    });

    useEffect(() => {
        fetch("/api/socket");
    }, []);

    useEffect(() => {
        socket.on("crypto_update", (payload) => {
            setMultiTransactions(payload);
            console.log("Received crypto update:", payload);
        });

        return () => {
            socket.off("crypto_update");
        };
    }, []); */






    const value = {
        prices, setPrices,
        formValues, setFormValues,
        isOnline, setIsOnline,
        cfdata, setCfdata,
        walletNetwork, setWalletNetwork,
        blockchainData, setBlockchainData,
        isLoading, setIsLoading,
        transactions, setTransactions,
        logData, setLogData,
        isSignin, setIsSignin,
        multiTransactions, setMultiTransactions,
        state, setState,
        isFlashing, setIsFlashing
    }

    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}


export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within an ContentProvider');
    }
    return context;
};