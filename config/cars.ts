export interface Car {
  id: string
  name: string
  category: string
  location: string
  pricePerDay: number
  image: string
  transmission: 'Automatic' | 'Manual'
  seats: number
  description: string
}

export const carsData: Car[] = [
  {
    id: "car1",
    name: "Tesla Model 3",
    category: "Electric",
    location: "las-vegas",
    pricePerDay: 100,
    image: "/cars/tesla-model-3.jpg",
    transmission: "Automatic",
    seats: 5,
    description: "Luxury electric vehicle with autopilot capabilities"
  },
  {
    id: "car2",
    name: "Toyota Camry",
    category: "Sedan",
    location: "new-york",
    pricePerDay: 75,
    image: "/cars/toyota-camry.jpg",
    transmission: "Automatic",
    seats: 5,
    description: "Reliable mid-size sedan with great fuel efficiency"
  },
  // Add more cars as needed
]