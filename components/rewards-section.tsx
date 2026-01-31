const REWARD_TIERS = {
  "Level 4 - Exceptional Participation": [
    { reward: "$OFC Token Allocation (5,000 - 10,000)", status: "Eligible", icon: "💰" },
    { reward: "Early Access to Features", status: "Eligible", icon: "⭐" },
    { reward: "Premium Community Status", status: "Eligible", icon: "👑" },
    { reward: "Enhanced Rewards in Future Events", status: "Eligible", icon: "🎁" },
  ],
  "Level 3 - Strong Participation": [
    { reward: "$OFC Token Allocation (2,000 - 5,000)", status: "Eligible", icon: "💰" },
    { reward: "Community Recognition", status: "Eligible", icon: "🏆" },
    { reward: "Priority Support Access", status: "Eligible", icon: "💎" },
  ],
  "Level 2 - Active Participation": [
    { reward: "$OFC Token Allocation (1,000 - 2,000)", status: "Eligible", icon: "💰" },
    { reward: "Community Access", status: "Eligible", icon: "🤝" },
  ],
  "Level 1 - Community Participant": [{ reward: "$OFC Token Allocation (200 - 999)", status: "Eligible", icon: "💰" }],
}

interface RewardsSectionProps {
  allocation: number
  tier: string
  balls: number
}

export default function RewardsSection({ allocation, tier, balls }: RewardsSectionProps) {
  const rewards = REWARD_TIERS[tier as keyof typeof REWARD_TIERS] || []

  return (
    <div className="bg-card border border-border rounded-2xl p-8 space-y-6 hover:border-accent/50 transition-all">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <span className="text-3xl">🎁</span>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Your Airdrop Allocation</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {allocation.toLocaleString()} $OFC based on {balls.toLocaleString()} BALLS collected
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {rewards.map((reward, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-accent/50 transition-all hover:bg-muted/50 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">{reward.icon}</span>
              <span className="font-medium text-foreground">{reward.reward}</span>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full whitespace-nowrap">
              {reward.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
        <p>
          Your $OFC airdrop allocation is determined by the BALLS you've collected through community participation,
          including tasks, daily check-ins, referrals, and gameplay. The more BALLS collected, the higher your
          allocation tier.
        </p>
        <p className="text-xs italic">
          Allocation is subject to OneFootball's final determination and token distribution terms.
        </p>
      </div>
    </div>
  )
}
