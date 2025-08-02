const mongoose = require("mongoose")
require("dotenv").config()

const User = require("../models/User")
const Car = require("../models/Car")
const Booking = require("../models/Booking")
const Review = require("../models/Review")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://workrohit282:S9ng1daIQmnL3C6C@cluster0.r3nfatc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Car.deleteMany({})
    await Booking.deleteMany({})
    await Review.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Create admin user
    const adminUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@carrental.com",
      password: "admin123",
      phone: "+1234567890",
      dateOfBirth: new Date("1990-01-01"),
      licenseNumber: "ADMIN123",
      address: {
        street: "123 Admin St",
        city: "Admin City",
        state: "AC",
        zipCode: "12345",
      },
      role: "admin",
      isVerified: true,
    })
    await adminUser.save()

    // Create business users
    const businessUser1 = new User({
      firstName: "John",
      lastName: "Business",
      email: "john@business.com",
      password: "business123",
      phone: "+1234567891",
      dateOfBirth: new Date("1985-05-15"),
      licenseNumber: "BUS001",
      address: {
        street: "456 Business Ave",
        city: "Business City",
        state: "BC",
        zipCode: "23456",
      },
      role: "business",
      isVerified: true,
    })
    await businessUser1.save()

    const businessUser2 = new User({
      firstName: "Sarah",
      lastName: "Enterprise",
      email: "sarah@enterprise.com",
      password: "business123",
      phone: "+1234567892",
      dateOfBirth: new Date("1988-08-20"),
      licenseNumber: "BUS002",
      address: {
        street: "789 Enterprise Blvd",
        city: "Enterprise City",
        state: "EC",
        zipCode: "34567",
      },
      role: "business",
      isVerified: true,
    })
    await businessUser2.save()

    // Create customer users
    const customers = []
    for (let i = 1; i <= 5; i++) {
      const customer = new User({
        firstName: `Customer`,
        lastName: `${i}`,
        email: `customer${i}@example.com`,
        password: "customer123",
        phone: `+123456789${i}`,
        dateOfBirth: new Date(`199${i}-0${i}-0${i}`),
        licenseNumber: `CUST00${i}`,
        address: {
          street: `${i}00 Customer St`,
          city: "Customer City",
          state: "CC",
          zipCode: `${i}0000`,
        },
        role: "customer",
        isVerified: true,
        loyaltyPoints: Math.floor(Math.random() * 1000),
      })
      await customer.save()
      customers.push(customer)
    }

    console.log("👥 Created users")

    // Create cars
    const carData = [
      {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        category: "midsize",
        transmission: "automatic",
        fuelType: "hybrid",
        seats: 5,
        pricePerDay: 65,
        location: "Los Angeles, CA",
        owner: businessUser1._id,
        mileage: 15000,
        licensePlate: "TOY001CA",
        description: "Fuel-efficient hybrid sedan perfect for city driving",
        features: ["air_conditioning", "bluetooth", "backup_camera", "usb_ports"],
        images: [
          { url: "/placeholder.svg?height=300&width=400", alt: "Toyota Camry exterior", isPrimary: true },
          { url: "/placeholder.svg?height=300&width=400", alt: "Toyota Camry interior", isPrimary: false },
        ],
        insurance: {
          provider: "State Farm",
          policyNumber: "SF123456",
          expiryDate: new Date("2024-12-31"),
        },
        maintenance: {
          lastService: new Date("2024-01-15"),
          nextService: new Date("2024-07-15"),
        },
      },
      {
        make: "BMW",
        model: "X5",
        year: 2022,
        category: "luxury",
        transmission: "automatic",
        fuelType: "gasoline",
        seats: 7,
        pricePerDay: 120,
        location: "New York, NY",
        owner: businessUser1._id,
        mileage: 25000,
        licensePlate: "BMW001NY",
        description: "Luxury SUV with premium features and spacious interior",
        features: ["air_conditioning", "bluetooth", "gps", "heated_seats", "sunroof", "wifi"],
        images: [
          { url: "/placeholder.svg?height=300&width=400", alt: "BMW X5 exterior", isPrimary: true },
          { url: "/placeholder.svg?height=300&width=400", alt: "BMW X5 interior", isPrimary: false },
        ],
        insurance: {
          provider: "Allstate",
          policyNumber: "AS789012",
          expiryDate: new Date("2024-11-30"),
        },
        maintenance: {
          lastService: new Date("2024-02-01"),
          nextService: new Date("2024-08-01"),
        },
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        category: "luxury",
        transmission: "automatic",
        fuelType: "electric",
        seats: 5,
        pricePerDay: 85,
        location: "San Francisco, CA",
        owner: businessUser2._id,
        mileage: 8000,
        licensePlate: "TSL001CA",
        description: "Electric vehicle with autopilot and premium sound system",
        features: ["air_conditioning", "bluetooth", "gps", "heated_seats", "wifi"],
        images: [
          { url: "/placeholder.svg?height=300&width=400", alt: "Tesla Model 3 exterior", isPrimary: true },
          { url: "/placeholder.svg?height=300&width=400", alt: "Tesla Model 3 interior", isPrimary: false },
        ],
        insurance: {
          provider: "Progressive",
          policyNumber: "PR345678",
          expiryDate: new Date("2025-01-31"),
        },
        maintenance: {
          lastService: new Date("2024-01-01"),
          nextService: new Date("2024-07-01"),
        },
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2023,
        category: "compact",
        transmission: "manual",
        fuelType: "gasoline",
        seats: 5,
        pricePerDay: 45,
        location: "Miami, FL",
        owner: businessUser2._id,
        mileage: 12000,
        licensePlate: "HON001FL",
        description: "Reliable compact car with excellent fuel economy",
        features: ["air_conditioning", "bluetooth", "usb_ports"],
        images: [
          { url: "/placeholder.svg?height=300&width=400", alt: "Honda Civic exterior", isPrimary: true },
          { url: "/placeholder.svg?height=300&width=400", alt: "Honda Civic interior", isPrimary: false },
        ],
        insurance: {
          provider: "Geico",
          policyNumber: "GE901234",
          expiryDate: new Date("2024-10-31"),
        },
        maintenance: {
          lastService: new Date("2024-01-20"),
          nextService: new Date("2024-07-20"),
        },
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2022,
        category: "convertible",
        transmission: "automatic",
        fuelType: "gasoline",
        seats: 4,
        pricePerDay: 95,
        location: "Las Vegas, NV",
        owner: businessUser1._id,
        mileage: 18000,
        licensePlate: "FRD001NV",
        description: "Iconic sports car convertible for an unforgettable drive",
        features: ["air_conditioning", "bluetooth", "heated_seats", "usb_ports"],
        images: [
          { url: "/placeholder.svg?height=300&width=400", alt: "Ford Mustang exterior", isPrimary: true },
          { url: "/placeholder.svg?height=300&width=400", alt: "Ford Mustang interior", isPrimary: false },
        ],
        insurance: {
          provider: "Liberty Mutual",
          policyNumber: "LM567890",
          expiryDate: new Date("2024-09-30"),
        },
        maintenance: {
          lastService: new Date("2024-02-10"),
          nextService: new Date("2024-08-10"),
        },
      },
    ]

    const cars = []
    for (const carInfo of carData) {
      const car = new Car(carInfo)
      await car.save()
      cars.push(car)
    }

    console.log("🚗 Created cars")

    // Create some bookings
    const bookings = []
    for (let i = 0; i < 10; i++) {
      const randomCar = cars[Math.floor(Math.random() * cars.length)]
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)]

      const startDate = new Date()
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 1)

      const endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1)

      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      const totalAmount = randomCar.pricePerDay * days

      const booking = new Booking({
        user: randomCustomer._id,
        car: randomCar._id,
        startDate,
        endDate,
        pickupLocation: randomCar.location,
        dropoffLocation: randomCar.location,
        totalAmount,
        status: ["pending", "confirmed", "completed"][Math.floor(Math.random() * 3)],
        paymentStatus: "paid",
      })

      await booking.save()
      bookings.push(booking)
    }

    console.log("📅 Created bookings")

    // Create reviews for completed bookings
    const completedBookings = bookings.filter((b) => b.status === "completed")
    for (const booking of completedBookings) {
      const review = new Review({
        user: booking.user,
        car: booking.car,
        booking: booking._id,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        title: "Great experience!",
        comment: "The car was clean, comfortable, and exactly as described. Would definitely rent again!",
        aspects: {
          cleanliness: Math.floor(Math.random() * 2) + 4,
          comfort: Math.floor(Math.random() * 2) + 4,
          performance: Math.floor(Math.random() * 2) + 4,
          value: Math.floor(Math.random() * 2) + 4,
        },
        isVerified: true,
      })

      await review.save()
    }

    console.log("⭐ Created reviews")

    // Update car ratings based on reviews
    for (const car of cars) {
      const reviews = await Review.find({ car: car._id })
      if (reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        car.rating.average = avgRating
        car.rating.count = reviews.length
        await car.save()
      }
    }

    console.log("✅ Database seeded successfully!")
    console.log(`
    📊 Summary:
    - Admin user: admin@carrental.com (password: admin123)
    - Business users: 2 (john@business.com, sarah@enterprise.com - password: business123)
    - Customer users: 5 (customer1@example.com to customer5@example.com - password: customer123)
    - Cars: ${cars.length}
    - Bookings: ${bookings.length}
    - Reviews: ${completedBookings.length}
    `)
  } catch (error) {
    console.error("❌ Seeding error:", error)
  } finally {
    mongoose.connection.close()
  }
}

seedData()
