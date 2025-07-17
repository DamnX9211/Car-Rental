import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Search, Filter, Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for listings
const listingsData = [
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
  },
  {
    id: "listing5",
    carName: "Toyota Camry",
    category: "Sedan",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 89,
    seats: 5,
    transmission: "Automatic",
    rating: 4.6,
    location: "Chicago",
    bookings: 8,
    revenue: 712,
    status: "maintenance",
  },
  {
    id: "listing6",
    carName: "Jeep Wrangler",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 135,
    seats: 4,
    transmission: "Manual",
    rating: 4.7,
    location: "Denver",
    bookings: 10,
    revenue: 1350,
    status: "active",
  },
]

export default function ListingsPage() {
  return (
    <div className="container py-10 min-h-screen">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground">Manage your vehicle listings and track their performance.</p>
        </div>
        <Button asChild>
          <Link href="/business/add-listing">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search listings..." className="pl-9" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listingsData.map((listing) => (
          <Card key={listing.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-[16/9] relative">
              <Image src={listing.image || "/placeholder.svg"} alt={listing.carName} fill className="object-cover" />
              <Badge className="absolute left-2 top-2">{listing.category}</Badge>
              <Badge variant={listing.status === "active" ? "default" : "secondary"} className="absolute right-2 top-2">
                {listing.status === "active" ? "Active" : "Maintenance"}
              </Badge>
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

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

