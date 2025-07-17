import type React from "react"
import type { Metadata } from "next"
import { BusinessNavbar } from "@/components/business/navbar"
import { BusinessFooter } from "@/components/business/footer"

export const metadata: Metadata = {
  title: "CarRental Business - List Your Cars for Rent",
  description: "Grow your car rental business by listing your vehicles on our platform.",
}

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <BusinessNavbar />
      <div className="flex-1">{children}</div>
      <BusinessFooter />
    </div>
  )
}

