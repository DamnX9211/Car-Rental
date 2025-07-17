"use client"

import { useState, useEffect } from "react"
import { CarCard } from "@/components/car-card"

// Mock data - in a real app, this would come from an API
const carsData = [
  {
    id: "car1",
    name: "Tesla Model S",
    category: "Electric",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 199,
    seats: 5,
    transmission: "Automatic",
    rating: 4.9,
    location: "New York"
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
    location: "Los Angeles"
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
    location: "Chicago"
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
    location: "Miami"
  },
  {
    id: "car5",
    name: "Audi A6",
    category: "Luxury",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 175,
    seats: 5,
    transmission: "Automatic",
    rating: 4.7,
    location: "New York"
  }
]

export function SimilarCars({ currentCarId, category }: { currentCarId: string, category: string }) {
  const [similarCars, setSimilarCars] = useState([])
  
  useEffect(() => {
    // Filter cars by category and exclude current car
    const filtered = carsData
      .filter(car => car.id !== currentCarId && car.category === category)
      .slice(0, 3)
    
    setSimilarCars(filtered)
  }, [currentCarId, category])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {similarCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}

