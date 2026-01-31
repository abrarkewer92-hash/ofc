export default function AllocationCard({
  allocation,
  address,
  balls,
}: { allocation: number; address: string; balls?: number }) {
  return (
    <div className="bg-card border border-accent/20 rounded-2xl p-8 space-y-6 gold-glow hover:border-accent/40 transition-all">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">Your Verified Allocation</p>
        <p className="text-5xl md:text-6xl font-bold gold-text text-balance">{allocation.toLocaleString()}</p>
        <p className="text-lg text-muted-foreground">$OFC Tokens</p>
      </div>

      {balls && (
        <div className="pt-4 border-t border-border/50 space-y-1">
          <p className="text-sm text-muted-foreground">BALLS Collected (Determines Allocation)</p>
          <p className="text-2xl font-semibold text-accent">{balls.toLocaleString()} ⚽</p>
          <p className="text-xs text-muted-foreground mt-2">
            {balls < 1000 && "25,000 $OFC tier"}
            {balls >= 1000 && balls < 2000 && "35,000 $OFC tier"}
            {balls >= 2000 && "Up to 75,000 $OFC tier"}
          </p>
        </div>
      )}

      <div className="pt-6 border-t border-border space-y-3">
        <p className="text-sm text-muted-foreground">Wallet Address</p>
        <p className="text-xs md:text-sm font-mono bg-primary/5 p-3 rounded-lg break-all text-foreground">{address}</p>
      </div>

      <div className="pt-2 text-xs text-accent flex items-center gap-2">
        <span>✓</span>
        <span>Verified allocation based on BALLS data - consistent across all lookups</span>
      </div>
    </div>
  )
}
