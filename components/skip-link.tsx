"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className={cn(
        "fixed top-4 left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "opacity-0 focus:opacity-100 pointer-events-none focus:pointer-events-auto",
        "transform -translate-y-12 focus:translate-y-0 transition",
      )}
    >
      Skip to main content
    </a>
  )
}

