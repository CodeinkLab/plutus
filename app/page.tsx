/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import "./globals.css"
import ServersDropDownComponent from './components/dropdownserver'
import Address from './components/address'
import WalletAndUserInfo from './components/walletanduserinfo'
import AdvancedOption from './components/advanceoption'
import FlashingButton from './components/flashingbutton'
import Amount from './components/amount'
import LogViewer from './components/logviewer'


export default function Home() {

  return (
    <main className="min-w-lg max-w-5xl mx-auto flex flex-col h-full w-full mt-8 items-center px-4 text-green-800 gap-4">

      <ServersDropDownComponent />
      <Address />

      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="flex flex-col items-center gap-4">
          <Amount />
          <AdvancedOption />
        </div>
        <WalletAndUserInfo />
      </div>
      <FlashingButton />
      <LogViewer />
    </main>
  )
}




