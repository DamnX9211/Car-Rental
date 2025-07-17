import type React from "react"
import Link from "next/link"
import { Car, CreditCard, FileQuestion, HelpCircle, MapPin, Shield, User, Wrench } from "lucide-react"

interface SupportCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function SupportCategory({ icon, title, description, href }: SupportCategoryProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center rounded-lg border bg-card p-6 text-center transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}

export function SupportCategories() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <SupportCategory
        icon={<Car className="h-6 w-6" />}
        title="Reservations & Rentals"
        description="Booking, modifying, and managing your car rentals"
        href="/help-center/reservations"
      />
      <SupportCategory
        icon={<CreditCard className="h-6 w-6" />}
        title="Payments & Billing"
        description="Payment methods, charges, receipts, and refunds"
        href="/help-center/payments"
      />
      <SupportCategory
        icon={<User className="h-6 w-6" />}
        title="Account Management"
        description="Profile settings, login issues, and preferences"
        href="/help-center/account"
      />
      <SupportCategory
        icon={<Shield className="h-6 w-6" />}
        title="Insurance & Coverage"
        description="Protection plans, damage policies, and claims"
        href="/help-center/insurance"
      />
      <SupportCategory
        icon={<MapPin className="h-6 w-6" />}
        title="Locations & Pickup"
        description="Branch locations, hours, and pickup procedures"
        href="/help-center/locations"
      />
      <SupportCategory
        icon={<Wrench className="h-6 w-6" />}
        title="Vehicle Issues"
        description="Maintenance, breakdowns, and roadside assistance"
        href="/help-center/vehicle-issues"
      />
      <SupportCategory
        icon={<FileQuestion className="h-6 w-6" />}
        title="Policies & Terms"
        description="Rental policies, requirements, and restrictions"
        href="/help-center/policies"
      />
      <SupportCategory
        icon={<HelpCircle className="h-6 w-6" />}
        title="General Inquiries"
        description="Other questions and information about our services"
        href="/help-center/general"
      />
    </div>
  )
}

