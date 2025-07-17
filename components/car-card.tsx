"use client"

import Link from "next/link"
import { Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { motion } from "framer-motion"

interface Car {
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

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Card className="overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="aspect-[16/9] relative overflow-hidden">
        <ImageWithFallback
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-110"
          priority={false}
        />
        <Badge className="absolute left-3 top-3 bg-primary/90 hover:bg-primary text-white border-0">
          {car.category}
        </Badge>
      </div>
      <CardContent className="p-5 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{car.name}</h3>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-medium">{car.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{car.location}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Users className="mr-1 h-4 w-4 text-primary" aria-hidden="true" />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center text-sm">
            <Zap className="mr-1 h-4 w-4 text-primary" aria-hidden="true" />
            <span>{car.transmission}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-5 bg-muted/30">
        <div>
          <span className="text-2xl font-bold text-primary">${car.pricePerDay}</span>
          <span className="text-sm text-muted-foreground"> / day</span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size="sm" className="rounded-full">
            <Link href={`/cars/${car.id}`}>
              View Details
              <span className="sr-only">about {car.name}</span>
            </Link>
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  )
}

