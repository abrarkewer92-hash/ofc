import { getTierColor, getTierDescription } from "@/lib/allocation"

interface TierCardProps {
  tier: string
  rank: string
  allocation: number
  balls: number
}

const TIER_ICONS: Record<string, string> = {
  "Level 4 - Exceptional Participation": "🔥",
  "Level 3 - Strong Participation": "⭐",
  "Level 2 - Active Participation": "🎯",
  "Level 1 - Community Participant": "⚽",
}

export default function TierCard({ tier, rank, allocation, balls }: TierCardProps) {
  const tierColor = getTierColor(tier)
  const description = getTierDescription(tier)
  const tierIcon = TIER_ICONS[tier] || "⚽"

  return (
    <div className="bg-card border border-border rounded-2xl p-8 space-y-6 hover:border-accent/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="text-5xl">{tierIcon}</div>
        <div>
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">Participation Level</p>
          <h2 className={`text-3xl font-bold ${tierColor}`}>{tier}</h2>
        </div>
      </div>

      <div className={`px-4 py-3 rounded-lg ${tierColor.replace("text", "bg").split(" ")[0]}/10`}>
        <p className="text-sm font-semibold">{description}</p>
      </div>

      <div className="pt-6 border-t border-border space-y-3">
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">BALLS Collected</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <p className="text-2xl font-bold text-primary">{balls.toLocaleString()}</p>
        </div>
      </div>

      <div className="pt-6 border-t border-border space-y-3">
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">$OFC Allocation</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <p className="text-lg font-bold text-yellow-600">{allocation.toLocaleString()} $OFC</p>
        </div>
      </div>

      <div className="pt-6 border-t border-border space-y-3">
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">Rank Position</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <p className="text-lg font-bold text-primary">{rank}</p>
        </div>
      </div>

      <div className="pt-2 space-y-2 text-xs text-muted-foreground">
        <p>
          Your allocation is determined by BALLS collected through participation in OneFootball community activities,
          tasks, and gameplay.
        </p>
      </div>
    </div>
  )
}
