import Link from "next/link"
import { Car, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function BusinessFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/business" className="mb-4 flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="font-bold">
                CarRental <span className="text-primary">Business</span>
              </span>
            </Link>
            <p className="mb-4 max-w-xs text-muted-foreground">
              Grow your car rental business by listing your vehicles on our platform. Reach more customers and maximize
              your fleet's earning potential.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/business" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/business/listings" className="text-muted-foreground hover:text-primary">
                  My Listings
                </Link>
              </li>
              <li>
                <Link href="/business/add-listing" className="text-muted-foreground hover:text-primary">
                  Add Listing
                </Link>
              </li>
              <li>
                <Link href="/business/bookings" className="text-muted-foreground hover:text-primary">
                  Bookings
                </Link>
              </li>
              <li>
                <Link href="/business/payments" className="text-muted-foreground hover:text-primary">
                  Payments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/business/help" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/business/guides" className="text-muted-foreground hover:text-primary">
                  Business Guides
                </Link>
              </li>
              <li>
                <Link href="/business/success-stories" className="text-muted-foreground hover:text-primary">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/business/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/business/terms" className="text-muted-foreground hover:text-primary">
                  Business Terms
                </Link>
              </li>
              <li>
                <Link href="/business/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/business/insurance" className="text-muted-foreground hover:text-primary">
                  Insurance Requirements
                </Link>
              </li>
              <li>
                <Link href="/business/compliance" className="text-muted-foreground hover:text-primary">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CarRental Business. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

