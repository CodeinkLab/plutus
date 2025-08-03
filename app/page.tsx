import React from 'react'
import { headers } from 'next/headers'
import "./globals.css"
import ServersDropDownComponent from './components/dropdownserver'
import Address from './components/address'
import WalletAndUserInfo from './components/walletanduserinfo'
import AdvancedOption from './components/advanceoption'
import FlashingButton from './components/flashingbutton'
import Amount from './components/amount'
import LogViewer from './components/logviewer'
import Pricing from './components/Pricing'
import TransactionDashboard from './components/TransactionDashboard'
import LiveTransactionControls from './components/LiveTransactionControls'
import { getLocationData } from './actions/location'
import { getCurrentUser } from './utils/jwt'

export default async function Home() {
  const headersList = headers()
  const forwardedFor = (await headersList).get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0] || '8.8.8.8'
  const location = await getLocationData(ip)
  const user = await getCurrentUser()

  const finalUser = process.env.NODE_ENV === "production" ? user : {
    username: `User${Math.floor(Math.random() * 1000)}`,
    password: "****************",
    email: `testing@flex.com`,
    plan: ["FREE"/* , "PREMIUM", "PRO" */][Math.floor(Math.random() * 1)],
  }
  const finalLocation = process.env.NODE_ENV === "production" ? location : {
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    city: ["New York", "London", "Tokyo", "Paris", "Sydney"][Math.floor(Math.random() * 5)],
    region: ["NY", "ENG", "TKY", "IDF", "NSW"][Math.floor(Math.random() * 5)],
    country: ["US", "GB", "JP", "FR", "AU"][Math.floor(Math.random() * 5)],
    countryName: ["United States", "United Kingdom", "Japan", "France", "Australia"][Math.floor(Math.random() * 5)],
    timezone: ["America/New_York", "Europe/London", "Asia/Tokyo", "Europe/Paris", "Australia/Sydney"][Math.floor(Math.random() * 5)],
    latitude: (Math.random() * 180 - 90),
    longitude: (Math.random() * 360 - 180),
    isp: ["Verizon", "BT", "NTT", "Orange", "Telstra"][Math.floor(Math.random() * 5)]
  }


  return (
    <main className="max-w-5xl mx-auto flex flex-col h-full w-full mt-8 items-center px-4 text-green-800 gap-4">
       <div className="py-2">
        {/* <p className="text-red-500">Notice: System is currently undergoing maintenance. Every user has to sign up for a new account</p> */}
        
      </div> 
      <ServersDropDownComponent />
      <Address />

      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="flex flex-col items-center gap-4">
          <Amount />
          <AdvancedOption />
        </div>
        <WalletAndUserInfo user={finalUser} location={finalLocation} />
      </div>
      <FlashingButton />
      <LogViewer />

      {/* Transaction Dashboard 
      {user && (
        <div className="w-full mt-8">
          <TransactionDashboard />
        </div>
      )}*/}

      {/* Pricing Section */}
      <div className="w-full mt-8">
        <Pricing />
      </div>

      {/* Live Transaction Controls - For Testing */}
      {/* <LiveTransactionControls /> */}

    </main>
  )
}




