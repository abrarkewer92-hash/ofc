export default function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center gold-glow overflow-hidden">
            <video
              src="https://assets.megaphone.xyz/pages/ofc/hero-badge-v1.mp4"
              autoPlay
              loop
              playsInline
              className="object-contain h-full w-full"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">OneFootball Club</h1>
            <p className="text-sm text-muted-foreground">Pre-TGE Portal</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm text-muted-foreground">Token Launch Portal</p>
        </div>
      </div>
    </header>
  )
}
