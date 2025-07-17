import { redirect } from "next/navigation"
import { UserProfile } from "@/components/user-profile"

// This would be a server component in a real app
// where we'd check the session on the server
export default function AccountPage() {
  // Simulate server-side auth check
  const isAuthenticated = true
  
  if (!isAuthenticated) {
    redirect("/")
  }
  
  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Profile</h1>
      <UserProfile />
    </div>
  )
}

