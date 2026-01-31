import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OneFootball Club Pre-TGE Portal",
  description: "OneFootball Club Pre-TGE Portal - Check your $OFC airdrop allocation",
  generator: "OneFootball",
  icons: {
    icon: "/ofclogo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>{children}</body>
    </html>
  )
}
