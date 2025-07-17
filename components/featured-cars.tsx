"use client"

import { useState, useEffect } from "react"
import { CarCard } from "@/components/car-card"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data - in a real app, this would come from an API
const featuredCarsData = [
  {
    id: "car1",
    name: "Tesla Model S",
    category: "Electric",
    image: "/TeslamodelS.avif?height=300&width=500",
    pricePerDay: 199,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    location: "New York",
  },
  {
    id: "car2",
    name: "BMW 5 Series",
    category: "Luxury",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 179,
    seats: 5,
    transmission: "Automatic",
    rating: 4.8,
    location: "Los Angeles",
  },
  {
    id: "car3",
    name: "Mercedes-Benz E-Class",
    category: "Luxury",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 189,
    seats: 5,
    transmission: "Automatic",
    rating: 4.7,
    location: "Chicago",
  },
  {
    id: "car4",
    name: "Range Rover Sport",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 220,
    seats: 7,
    transmission: "Automatic",
    rating: 4.8,
    location: "Miami",
  },
]

type Car = {
  id: string
  name: string
  category: string
  image: string
  pricePerDay: number
  seats: number
  transmission: string
  rating: number
  location: string
}

export function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // In a real app, you would fetch data from an API
  useEffect(() => {
    // Simulating API call with a delay
    const timer = setTimeout(() => {
      setCars(featuredCarsData)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <FeaturedCarsSkeleton />
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {cars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <CarCard car={car} />
        </motion.div>
      ))}
    </div>
  )
}

function FeaturedCarsSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="rounded-xl border shadow-sm overflow-hidden">
          <Skeleton className="aspect-[16/9] w-full" />
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <div className="border-t p-5 flex justify-between items-center">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

