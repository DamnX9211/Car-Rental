import Image from "next/image"
import Link from "next/link"
import { Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Mock data for popular listings
const popularListings = [
  {
    id: "listing1",
    carName: "Tesla Model 3",
    category: "Electric",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 129,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    location: "New York",
    bookings: 24,
    revenue: 3096,
  },
  {
    id: "listing2",
    carName: "Mercedes-Benz GLC",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 159,
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    location: "Los Angeles",
    bookings: 18,
    revenue: 2862,
  },
  {
    id: "listing3",
    carName: "BMW 3 Series",
    category: "Luxury",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 145,
    seats: 5,
    transmission: "Automatic",
    rating: 4.7,
    location: "Chicago",
    bookings: 15,
    revenue: 2175,
  },
  {
    id: "listing4",
    carName: "Audi Q5",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 165,
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    location: "Miami",
    bookings: 12,
    revenue: 1980,
  },
]

export function PopularListings() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {popularListings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="aspect-[16/9] relative">
            <Image src={listing.image || "/placeholder.svg"} alt={listing.carName} fill className="object-cover" />
            <Badge className="absolute left-2 top-2">{listing.category}</Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{listing.carName}</h3>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{listing.rating}</span>
              </div>
            </div>
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

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-muted p-2 text-center">
                <span className="block font-medium">{listing.bookings}</span>
                <span className="text-xs text-muted-foreground">Bookings</span>
              </div>
              <div className="rounded-md bg-muted p-2 text-center">
                <span className="block font-medium">${listing.revenue}</span>
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div>
              <span className="text-xl font-bold">${listing.pricePerDay}</span>
              <span className="text-sm text-muted-foreground"> / day</span>
            </div>
            <Button asChild size="sm">
              <Link href={`/business/listings/${listing.id}`}>Manage</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

