"use client"

import type React from "react"

import { useState } from "react"
import { generateAllocation, validateAddress } from "@/lib/allocation"

interface AddressCheckerProps {
  onResult: (result: any) => void
}

export default function AddressChecker({ onResult }: AddressCheckerProps) {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!validateAddress(address)) {
        throw new Error("Invalid EVM address format")
      }

      const allocation = generateAllocation(address)
      onResult(allocation)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-4xl md:text-5xl font-bold text-balance">Check Your Allocation</h2>
        <p className="text-lg text-muted-foreground">
          Enter your EVM wallet address to discover your $OFC airdrop eligibility.
        </p>
      </div>

      <form onSubmit={handleCheck} className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground">Wallet Address</label>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !address}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              {isLoading ? "Verifying..." : "Check Allocation"}
            </button>
          </div>
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        </div>
      </form>
    </div>
  )
}
