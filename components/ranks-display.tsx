const TIER_RANGES = [
  { tier: "Level 4 - Exceptional Participation", min: 100000, max: 150000, color: "text-yellow-600", icon: "🔥" },
  { tier: "Level 3 - Strong Participation", min: 50000, max: 99999, color: "text-blue-600", icon: "⭐" },
  { tier: "Level 2 - Active Participation", min: 25000, max: 49999, color: "text-purple-600", icon: "🎯" },
  { tier: "Level 1 - Community Participant", min: 5000, max: 24999, color: "text-slate-500", icon: "⚽" },
]

export default function RanksDisplay({ currentBalls }: { currentBalls: number }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
      <h3 className="text-2xl font-bold">BALLS Tier Breakdown</h3>

      <div className="space-y-3">
        {TIER_RANGES.map((range) => {
          const isCurrent = currentBalls >= range.min && currentBalls <= range.max
          return (
            <div
              key={range.tier}
              className={`flex items-center justify-between p-4 rounded-lg border transition ${
                isCurrent ? "bg-accent/10 border-accent" : "bg-background border-border hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-xl">{range.icon}</div>
                <div>
                  <p className={`font-semibold ${range.color}`}>{range.tier}</p>
                  <p className="text-sm text-muted-foreground">
                    {range.min.toLocaleString()} - {range.max.toLocaleString()} BALLS
                  </p>
                </div>
              </div>
              {isCurrent && (
                <span className="text-xs font-bold px-3 py-1 bg-accent text-accent-foreground rounded-full">
                  YOUR LEVEL
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
