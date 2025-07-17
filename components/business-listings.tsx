import Image from "next/image"
import Link from "next/link"
import { Star, Users, Zap, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Mock data for business listings
const businessListings = [
  {
    id: "listing1",
    ownerName: "Premier Auto Rentals",
    carName: "Tesla Model 3",
    category: "Electric",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 129,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    location: "New York",
    featured: true,
  },
  {
    id: "listing2",
    ownerName: "Luxury Fleet Services",
    carName: "Mercedes-Benz GLC",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 159,
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    location: "Los Angeles",
    featured: true,
  },
  {
    id: "listing3",
    ownerName: "City Wheels Inc.",
    carName: "BMW 3 Series",
    category: "Luxury",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 145,
    seats: 5,
    transmission: "Automatic",
    rating: 4.7,
    location: "Chicago",
    featured: true,
  },
  {
    id: "listing4",
    ownerName: "Executive Car Rentals",
    carName: "Audi Q5",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 165,
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    location: "Miami",
    featured: true,
  },
]

interface BusinessListingCardProps {
  listing: (typeof businessListings)[0]
}

function BusinessListingCard({ listing }: BusinessListingCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[16/9] relative">
        <Image src={listing.image || "/placeholder.svg"} alt={listing.carName} fill className="object-cover" />
        <Badge className="absolute left-2 top-2">{listing.category}</Badge>
        {listing.featured && (
          <Badge variant="secondary" className="absolute right-2 top-2">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{listing.carName}</h3>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-primary font-medium">{listing.ownerName}</p>
        <p className="text-sm text-muted-foreground">{listing.location}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Users className="mr-1 h-4 w-4" />
            <span>{listing.seats} seats</span>
          </div>
          <div className="flex items-center text-sm">
            <Zap className="mr-1 h-4 w-4" />
            <span>{listing.transmission}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div>
          <span className="text-xl font-bold">${listing.pricePerDay}</span>
          <span className="text-sm text-muted-foreground"> / day</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/cars/${listing.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function BusinessListings() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Partner With Us</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Own a fleet of vehicles? Join our business partner program and start earning by listing your cars on our
            platform. We provide the tools, technology, and customer base to help you maximize your rental income.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/business">
              <Briefcase className="h-5 w-5" />
              Start Business
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

