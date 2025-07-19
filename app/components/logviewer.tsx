/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'


import React, { useState, useEffect, useRef } from 'react'

interface HashData {
  url?: string;
  [key: string]: string | undefined;
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function LogViewer() {

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [dots, setDots] = useState<string>("")
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Dot animation for loader


  return (
    <div className="flex flex-col h-max min-h-80 border border-neutral-300 w-full">
      <div ref={logContainerRef}
        className="bg-black text-sm overflow-y-auto font-mono text-green-800 p-2">
        <p className="justify-center items-center text-center m-auto text-green-800 ju">Ready to flash!</p>
      </div>
    </div>
  )
}