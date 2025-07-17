import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/booking-form"
import { SimilarCars } from "@/components/similar-cars"
import { ThreeSixtyViewer } from "@/components/vehicle-viewer/three-sixty-viewer"
import { ReviewSystem } from "@/components/reviews/review-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/card"
import type { Metadata } from "next"
import { StructuredData } from "@/components/structured-data"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

// Mock data - in a real app, this would come from an API
const carsData = [
  {
    id: "car1",
    name: "Tesla Model S",
    category: "Electric",
    description:
      "Experience the future of driving with the Tesla Model S. This all-electric luxury sedan offers exceptional performance, range, and cutting-edge technology. With its sleek design and instant acceleration, the Model S delivers a driving experience like no other. Featuring Tesla's renowned Autopilot system and a minimalist interior centered around a large touchscreen display, this vehicle represents the pinnacle of electric vehicle engineering.",
    image: "/placeholder.svg?height=500&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    threeSixtyImages: [
      "/placeholder.svg?height=500&width=800&text=View+1",
      "/placeholder.svg?height=500&width=800&text=View+2",
      "/placeholder.svg?height=500&width=800&text=View+3",
      "/placeholder.svg?height=500&width=800&text=View+4",
      "/placeholder.svg?height=500&width=800&text=View+5",
      "/placeholder.svg?height=500&width=800&text=View+6",
      "/placeholder.svg?height=500&width=800&text=View+7",
      "/placeholder.svg?height=500&width=800&text=View+8",
    ],
    pricePerDay: 199,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    reviewCount: 120,
    location: "New York",
    features: [
      "Zero Emissions",
      "Autopilot",
      '17" Touchscreen',
      "Wireless Charging",
      "Premium Sound System",
      "Supercharger Access",
      "Over-the-air Updates",
      "Dual Motor AWD",
    ],
    availability: true,
  },
  {
    id: "car2",
    name: "BMW 5 Series",
    category: "Luxury",
    description:
      "The BMW 5 Series combines luxury, performance, and technology in a sophisticated package. This executive sedan offers a refined driving experience with responsive handling and powerful engine options. Inside, you'll find premium materials, cutting-edge infotainment, and spacious accommodations for both driver and passengers. With its blend of comfort and driving dynamics, the 5 Series represents the perfect balance of luxury and sportiness.",
    image: "/placeholder.svg?height=500&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    threeSixtyImages: [
      "/placeholder.svg?height=500&width=800&text=View+1",
      "/placeholder.svg?height=500&width=800&text=View+2",
      "/placeholder.svg?height=500&width=800&text=View+3",
      "/placeholder.svg?height=500&width=800&text=View+4",
      "/placeholder.svg?height=500&width=800&text=View+5",
      "/placeholder.svg?height=500&width=800&text=View+6",
    ],
    pricePerDay: 179,
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    reviewCount: 98,
    location: "Los Angeles",
    features: [
      "Leather Seats",
      "Navigation System",
      "Parking Sensors",
      "Active Cruise Control",
      "Heated Seats",
      "Sunroof",
      "LED Headlights",
      "Harman Kardon Audio",
    ],
    availability: true,
  },
]

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const car = carsData.find((car) => car.id === id);

  if (!car) {
    notFound();
  }

  // Generate breadcrumb data for structured data
  const breadcrumbData = {
    items: [
      { name: "Home", path: "/" },
      { name: "Cars", path: "/cars" },
      { name: car.name, path: `/cars/${car.id}` },
    ],
  }

  return (
    <>
      <StructuredData
        type="product"
        data={{
          name: car.name,
          description: car.description,
          image: car.image,
          pricePerDay: car.pricePerDay,
          availability: car.availability,
          rating: car.rating,
          reviewCount: car.reviewCount,
        }}
      />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <div className="container py-10">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/cars">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to cars
            </Link>
          </Button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight">{car.name}</h1>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-medium">{car.rating}</span>
              </div>
              <span className="text-muted-foreground">({car.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" aria-hidden="true" />
              <span>{car.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" aria-hidden="true" />
              <span>{car.seats} seats</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-1 h-4 w-4" aria-hidden="true" />
              <span>{car.transmission}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="gallery" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger data-value="gallery">Gallery</TabsTrigger>
                <TabsTrigger data-value="360-view">360° View</TabsTrigger>
              </TabsList>
              <TabsContent data-value="gallery" className="mt-4">
                <div className="overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    width={800}
                    height={500}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {car.gallery.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={image || "/placeholder.svg"}
                        alt={`${car.name} view ${index + 1}`}
                        width={300}
                        height={200}
                        className="h-auto w-full"
                        sizes="(max-width: 768px) 33vw, 300px"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent className="mt-4">
                <ThreeSixtyViewer images={car.threeSixtyImages} carName={car.name} />
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">About this car</h2>
              <p className="text-muted-foreground">{car.description}</p>

              <h3 className="mb-3 mt-6 text-xl font-semibold">Features</h3>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-primary" aria-hidden="true"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Reviews</h2>
              <ReviewSystem carId={car.id} carName={car.name} />
            </div>
          </div>

          <div>
            <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-24">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold">${car.pricePerDay}</span>
                  <span className="text-muted-foreground"> / day</span>
                </div>
              </div>

              <BookingForm carId={car.id} carName={car.name} pricePerDay={car.pricePerDay} />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Similar Cars You Might Like</h2>
          <SimilarCars currentCarId={car.id} category={car.category} />
        </div>
      </div>
    </>
  )
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const car = carsData.find((car) => car.id === id)

  if (!car) {
    return {
      title: "Car Not Found",
      description: "The requested car could not be found.",
    }
  }

  return {
    title: car.name,
    description: car.description.substring(0, 160),
    openGraph: {
      title: `${car.name} - Premium Car Rental`,
      description: car.description.substring(0, 160),
      images: [
        {
          url: car.image,
          width: 800,
          height: 500,
          alt: car.name,
        },
      ],
    },
  }
}

