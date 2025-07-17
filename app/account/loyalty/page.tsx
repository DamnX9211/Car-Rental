import { redirect } from "next/navigation"
import { LoyaltyProgram } from "@/components/loyalty/loyalty-program"

// This would be a server component in a real app
// where we'd check the session on the server
export default function LoyaltyPage() {
  // Simulate server-side auth check
  const isAuthenticated = true

  if (!isAuthenticated) {
    redirect("/")
  }

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Loyalty Program</h1>
      <LoyaltyProgram />
    </div>
  )
}

