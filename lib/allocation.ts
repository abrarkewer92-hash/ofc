// Hash function to generate deterministic number from address
function hashAddress(address: string): number {
  const normalized = address.toLowerCase()
  let hash = 0

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  return Math.abs(hash)
}

// Validate EVM address format
export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Non-linear conversion where BALLS and OFC are separate currencies
function ballsToOFC(balls: number): number {
  if (balls < 25000) {
    // Below 25000 BALLS: 200-999 $OFC tokens
    const ratio = balls / 25000
    return Math.floor(200 + ratio * 800)
  } else if (balls < 50000) {
    // 25000-50000 BALLS: 1000-2000 $OFC tokens
    const ratio = (balls - 25000) / 25000
    return Math.floor(1000 + ratio * 1000)
  } else if (balls < 100000) {
    // 50000-100000 BALLS: 2000-5000 $OFC tokens
    const ratio = (balls - 50000) / 50000
    return Math.floor(2000 + ratio * 3000)
  } else {
    // 100000+ BALLS: 5000-10000 $OFC tokens
    return Math.floor(5000 + Math.min((balls - 100000) / 10000, 5000))
  }
}

// Generate deterministic BALLS value for an address
function generateBALLS(address: string): number {
  const hash = hashAddress(address)
  // Generate BALLS between 5000 and 150000 for wider distribution
  return 5000 + (hash % 145001)
}

// Generate deterministic allocation for an address
export function generateAllocation(address: string): {
  address: string
  allocation: number
  balls: number
} {
  // Get from localStorage first for persistence
  const cacheKey = `ofc_allocation_${address.toLowerCase()}`
  const cached = localStorage.getItem(cacheKey)

  if (cached) {
    return JSON.parse(cached)
  }

  const balls = generateBALLS(address)
  const allocation = ballsToOFC(balls)

  const result = {
    address: address,
    allocation: allocation,
    balls: balls,
  }

  // Cache for future lookups
  localStorage.setItem(cacheKey, JSON.stringify(result))

  return result
}

// Determine tier based on BALLS (not allocation)
export function getTier(allocation: number, balls: number): string {
  if (balls >= 100000) return "Level 4 - Exceptional Participation"
  if (balls >= 50000) return "Level 3 - Strong Participation"
  if (balls >= 25000) return "Level 2 - Active Participation"
  return "Level 1 - Community Participant"
}

// Get tier color
export function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    "Level 4 - Exceptional Participation": "text-yellow-600",
    "Level 3 - Strong Participation": "text-blue-600",
    "Level 2 - Active Participation": "text-purple-600",
    "Level 1 - Community Participant": "text-slate-500",
  }
  return colors[tier] || "text-slate-500"
}

// Get tier description
export function getTierDescription(tier: string): string {
  const descriptions: Record<string, string> = {
    "Level 4 - Exceptional Participation":
      "100,000+ BALLS collected - Exceptional engagement across community activities",
    "Level 3 - Strong Participation": "50,000+ BALLS collected - Strong consistent participation and involvement",
    "Level 2 - Active Participation": "25,000+ BALLS collected - Active participation in community tasks",
    "Level 1 - Community Participant": "Under 25,000 BALLS - Community member with participation",
  }
  return descriptions[tier] || "Community participant"
}

// Calculate rank within tier
export function getRank(balls: number): string {
  if (balls >= 100000) {
    const percent = Math.min((balls - 100000) / 50000, 1) * 100
    if (percent >= 75) return "Peak Contributor"
    if (percent >= 50) return "High Contributor"
    if (percent >= 25) return "Mid Contributor"
    return "Entry Contributor"
  } else if (balls >= 50000) {
    const percent = ((balls - 50000) / 50000) * 100
    if (percent >= 75) return "Peak Engager"
    if (percent >= 50) return "High Engager"
    if (percent >= 25) return "Mid Engager"
    return "Entry Engager"
  } else if (balls >= 25000) {
    const percent = ((balls - 25000) / 25000) * 100
    if (percent >= 75) return "Peak Participant"
    if (percent >= 50) return "High Participant"
    if (percent >= 25) return "Mid Participant"
    return "Entry Participant"
  } else {
    const percent = (balls / 25000) * 100
    if (percent >= 75) return "Peak Member"
    if (percent >= 50) return "Active Member"
    return "Community Member"
  }
}
