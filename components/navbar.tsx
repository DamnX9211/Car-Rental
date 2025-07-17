"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User, Car, Phone, LogOut, Briefcase, Sun, Moon, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "@/components/theme-provider"
import { PushNotificationManager } from "@/components/notifications/push-notification"
import { motion } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const auth = useAuth?.() || { user: null, showAuthModal: () => {}, logout: () => {} }
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      role="banner"
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2" aria-label="CarRental home">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Car className="h-8 w-8 text-primary" aria-hidden="true" />
            </motion.div>
            <span className="hidden font-bold text-xl sm:inline-block">
              <span className="text-foreground">Car</span>
              <span className="text-primary">Rental</span>
            </span>
          </Link>

          <nav className="hidden md:flex md:gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", duration: 0.5 }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <PushNotificationManager />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>

          <Button variant="outline" className="hidden md:flex rounded-full" asChild>
            <Link href="/business">
              <Briefcase className="mr-2 h-4 w-4" aria-hidden="true" />
              Business
            </Link>
          </Button>

          {auth.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                  <User className="h-5 w-5" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account" className="flex items-center">
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account/bookings" className="flex items-center">
                    <Car className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/account/loyalty" className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Loyalty Program</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={auth.logout} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" onClick={auth.showAuthModal} className="rounded-full">
              Sign In
            </Button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden rounded-full"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-0" id="mobile-menu">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center">
                  <Car className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
                  <span>
                    <span className="text-foreground">Car</span>
                    <span className="text-primary">Rental</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/business"
                  className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Briefcase className="mr-2 h-5 w-5" aria-hidden="true" />
                  Business
                </Link>

                {auth.user ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" aria-hidden="true" />
                      My Profile
                    </Link>
                    <Link
                      href="/account/bookings"
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Car className="mr-2 h-5 w-5" aria-hidden="true" />
                      My Bookings
                    </Link>
                    <Link
                      href="/account/loyalty"
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Bell className="mr-2 h-5 w-5" aria-hidden="true" />
                      Loyalty Program
                    </Link>
                    <button
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary text-red-500"
                      onClick={() => {
                        auth.logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => {
                      auth.showAuthModal()
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign In
                  </button>
                )}

                <Link
                  href="/contact"
                  className="flex items-center rounded-full bg-primary px-4 py-3 text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Contact Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

