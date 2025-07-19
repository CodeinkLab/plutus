import type { Metadata } from "next"
import "./globals.css"
import localFont from 'next/font/local'
import { DialogProvider } from "@/app/lib/dialog"

export const metadata: Metadata = {
  title: "Plutus | Crypto Receipt && Real Crypto Flasher",
  description: "Plutus is a cryptocurrency wallet and exchange application that allows you to send flash transactions to any of the supported wallet addresses that can last for about 90 days.",
}


const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/Geist.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
})

const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/GeistMono.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="h-full" lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black h-full`}>
        <DialogProvider>
          {children}
        </DialogProvider>
      </body>
    </html>
  )
}

