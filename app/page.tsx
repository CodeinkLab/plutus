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
import { getLocationData } from './actions/location'
import { getCurrentUser } from './utils/jwt'

export default async function Home() {
  const headersList = headers()
  const forwardedFor = (await headersList).get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0] || '8.8.8.8'
  const location = await getLocationData(ip)
  const user = await getCurrentUser()

  /* const user = process.env.NODE_ENV === "production" ? currentuser :
    {
      username: "RazorBlade",
      password: "****************",
      email: "razorblade@plutus.com",
      plan: "FREE",
    } */


  return (
    <main className="min-w-lg max-w-5xl mx-auto flex flex-col h-full w-full mt-8 items-center px-4 text-green-800 gap-4">
      <ServersDropDownComponent />
      <Address />

      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="flex flex-col items-center gap-4">
          <Amount />
          <AdvancedOption />
        </div>
        <WalletAndUserInfo user={user} location={location} />
      </div>
      <FlashingButton />
      <LogViewer />

      {/* Pricing Section */}
      <div className="w-full mt-8">
        <Pricing />
      </div>

    </main>
  )
}




