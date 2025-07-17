import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SearchForm } from "@/components/search-form"
import { FeaturedCars } from "@/components/featured-cars"
import { BusinessListings } from "@/components/business-listings"
import { ChevronDown, Star, Shield, Clock, CreditCard, Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Traveler",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "CarRental has transformed my business trips. Their seamless booking process and premium vehicles make every journey a pleasure.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Vacationer",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "We rented an SUV for our family road trip and couldn't be happier. The vehicle was spotless, comfortable, and perfect for our needs.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Weekend Explorer",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The customer service is exceptional. When I had a last-minute change to my reservation, they accommodated me without any hassle.",
    rating: 4,
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <Image
          src="/homepage.jpg?height=1080&width=1920"
          alt="Luxury car on a scenic road"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

        <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Drive Your <span className="text-primary-foreground">Dreams</span>
          </h1>

          <p className="mb-8 max-w-lg text-lg text-white/90 sm:text-xl md:text-2xl">
            Premium car rental service with flexible options and unbeatable prices. Book your perfect ride today.
          </p>

          <div className="w-full max-w-4xl">
            <SearchForm />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ChevronDown className="h-10 w-10 text-white animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-24 bg-background" id="featured-cars">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Our Featured <span className="text-primary">Fleet</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of premium vehicles, meticulously maintained and ready for your next adventure.
            </p>
          </div>

          <Suspense fallback={<FeaturedCarsSkeleton />}>
            <FeaturedCars />
          </Suspense>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/cars">View All Cars</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted" id="benefits">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Why Choose <span className="text-primary">Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional service and value for every rental experience.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Shield className="h-8 w-8" aria-hidden="true" />,
                title: "Fully Insured",
                description: "All our vehicles come with comprehensive insurance coverage for your peace of mind.",
              },
              {
                icon: <Clock className="h-8 w-8" aria-hidden="true" />,
                title: "24/7 Support",
                description: "Our customer support team is available around the clock to assist you.",
              },
              {
                icon: <CreditCard className="h-8 w-8" aria-hidden="true" />,
                title: "No Hidden Fees",
                description: "Transparent pricing with no surprises. What you see is what you pay.",
              },
              {
                icon: <Sparkles className="h-8 w-8" aria-hidden="true" />,
                title: "Premium Vehicles",
                description: "Our fleet consists of well-maintained, latest model vehicles for your comfort.",
              },
            ].map((benefit, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{benefit.icon}</div>
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background" id="testimonials">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              What Our <span className="text-primary">Customers</span> Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their experience with
              us.perience with us.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-card-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Listings Section */}
      <BusinessListings />

      {/* Call to Action */}
      <section className="py-24 bg-primary text-primary-foreground" id="cta">
        <div className="container text-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">Ready to Hit the Road?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Join thousands of satisfied customers who trust us for their mobility needs.
            </p>
            <Button variant="secondary" size="lg" className="rounded-full" asChild>
              <Link href="/cars">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
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

