import { CarCard } from "@/components/car-card"

// Mock data - in a real app, this would come from an API/database
const carsData = [
  {
    id: "car1",
    name: "Tesla Model S",
    category: "Electric",
    image: "/TeslamodelS.avif?height=300&width=500",
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
  },
  {
    id: "car6",
    name: "Toyota Camry",
    category: "Economy",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 89,
    seats: 5,
    transmission: "Automatic",
    rating: 4.5,
    location: "Los Angeles"
  },
  {
    id: "car7",
    name: "Jeep Wrangler",
    category: "SUV",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 129,
    seats: 5,
    transmission: "Manual",
    rating: 4.6,
    location: "Las Vegas"
  },
  {
    id: "car8",
    name: "Ford Mustang",
    category: "Sport",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 149,
    seats: 4,
    transmission: "Automatic",
    rating: 4.8,
    location: "Miami"
  },
  {
    id: "car9",
    name: "Chevrolet Corvette",
    category: "Sport",
    image: "/placeholder.svg?height=300&width=500",
    pricePerDay: 239,
    seats: 2,
    transmission: "Automatic",
    rating: 4.9,
    location: "Las Vegas"
  },
]

export async function CarsList({ searchParams }: { searchParams: Record<string, string> }) {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Filter cars based on search parameters
  let filteredCars = [...carsData]
  
  if (searchParams.location) {
    filteredCars = filteredCars.filter(car => 
      car.location.toLowerCase() === searchParams.location.toLowerCase()
    )
  }
  
  if (searchParams.category) {
    filteredCars = filteredCars.filter(car => 
      car.category.toLowerCase() === searchParams.category.toLowerCase()
    )
  }
  
  if (searchParams.minPrice) {
    filteredCars = filteredCars.filter(car => 
      car.pricePerDay >= Number(searchParams.minPrice)
    )
  }
  
  if (searchParams.maxPrice) {
    filteredCars = filteredCars.filter(car => 
      car.pricePerDay <= Number(searchParams.maxPrice)
    )
  }

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCars.length > 0 ? (
        filteredCars.map((car) => <CarCard key={car.id} car={car} />)
      ) : (
        <div className="col-span-full py-12 text-center">
          <h3 className="text-lg font-medium">No cars found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your filters to find more options.</p>
        </div>
      )}
    </div>
  )
}

