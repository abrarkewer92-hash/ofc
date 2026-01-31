import { getTier, getRank } from "@/lib/allocation"
import AllocationCard from "./allocation-card"
import TierCard from "./tier-card"
import RanksDisplay from "./ranks-display"
import RewardsSection from "./rewards-section"

interface ResultsDisplayProps {
  result: {
    address: string
    allocation: number
    balls: number
  }
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const tier = getTier(result.allocation, result.balls)
  const rank = getRank(result.balls)

  return (
    <div className="space-y-8">
      {/* Main Result Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <AllocationCard allocation={result.allocation} address={result.address} balls={result.balls} />
        <TierCard tier={tier} rank={rank} allocation={result.allocation} balls={result.balls} />
      </div>

      {/* Ranks Overview */}
      <RanksDisplay currentBalls={result.balls} />

      {/* Rewards */}
      <RewardsSection allocation={result.allocation} tier={tier} balls={result.balls} />
    </div>
  )
}
