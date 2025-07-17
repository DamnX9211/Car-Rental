"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  User,
  Car,
  Phone,
  LogOut,
  BarChart,
  Settings,
  PlusCircle,
  FileText,
  CreditCard,
  BookOpen,
} from "lucide-react"
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
import { Sun, Moon } from "lucide-react"

const navLinks = [
  { href: "/business", label: "Dashboard", icon: <BarChart className="mr-2 h-4 w-4" /> },
  { href: "/business/listings", label: "My Listings", icon: <Car className="mr-2 h-4 w-4" /> },
  { href: "/business/add-listing", label: "Add Listing", icon: <PlusCircle className="mr-2 h-4 w-4" /> },
  { href: "/business/bookings", label: "Bookings", icon: <FileText className="mr-2 h-4 w-4" /> },
  { href: "/business/payments", label: "Payments", icon: <CreditCard className="mr-2 h-4 w-4" /> },
  { href: "/business/learn-more", label: "Learn More", icon: <BookOpen className="mr-2 h-4 w-4" /> },
]

export function BusinessNavbar() {
  const pathname = usePathname()
  const auth = useAuth?.() || { user: null, showAuthModal: () => {}, logout: () => {} }
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/business" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              CarRental <span className="text-primary">Business</span>
            </span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/">
              <Car className="mr-2 h-4 w-4" />
              Main Site
            </Link>
          </Button>

          {auth.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/business/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Business Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/business/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={auth.logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={auth.showAuthModal}>
              Sign In
            </Button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Business Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/"
                  className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Car className="mr-2 h-5 w-5" />
                  Main Site
                </Link>

                {auth.user ? (
                  <>
                    <Link
                      href="/business/profile"
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Business Profile
                    </Link>
                    <Link
                      href="/business/settings"
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                    <button
                      className="flex items-center py-2 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => {
                        auth.logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
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
                  href="/business/contact"
                  className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Support
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

