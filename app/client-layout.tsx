"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { SkipLink } from "@/components/skip-link"
import { useEffect } from "react"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isBusinessSection = pathname?.startsWith("/business")

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          {!isBusinessSection && <Navbar />}
          <main id="main-content" className={`flex-1 ${!isBusinessSection ? "pt-20" : ""}`}>
            {children}
          </main>
          {!isBusinessSection && <Footer />}
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

