"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { BarChart, ArrowRight, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessStats } from "@/components/business/stats"
import { RecentBookings } from "@/components/business/recent-bookings"
import { PopularListings } from "@/components/business/popular-listings"
import { InteractiveBusinessTools, BusinessDashboardCards } from "@/components/business/interactive-tools"
import { motion } from "framer-motion"

export default function BusinessDashboardPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Add smooth scrolling behavior
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      sectionsRef.current.forEach((section, index) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        // Calculate how much of the section is visible
        const visiblePx = Math.min(scrollPosition + windowHeight - sectionTop, sectionHeight)

        // If more than 30% of the section is visible, add the active class
        if (visiblePx > sectionHeight * 0.3) {
          section.classList.add("section-active")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative h-screen w-full flex items-center justify-center"
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Business dashboard hero"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Grow Your Car Rental Business
          </h1>
          <p className="mb-8 max-w-lg text-lg text-white/90 sm:text-xl">
            List your vehicles, manage bookings, and maximize your revenue with our comprehensive business platform.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild>
                <Link href="/business/add-listing">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Your First Listing
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="bg-background/20 text-white hover:bg-background/30">
                <Link href="/business/guides">Learn More</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ArrowRight className="h-10 w-10 text-white rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Dashboard Content */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex items-center py-20 bg-background"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <BusinessStats />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <BusinessDashboardCards />
          </motion.div>

          <Tabs defaultValue="bookings" className="mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              <TabsTrigger value="listings">Popular Listings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <RecentBookings />
              </motion.div>
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <PopularListings />
              </motion.div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>View detailed analytics about your listings and bookings.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Detailed analytics are available after you add your first listing and receive bookings.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="min-h-screen flex items-center py-20 bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Powerful Business Tools</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to manage your car rental business in one place.
            </p>
          </motion.div>

          <InteractiveBusinessTools />
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-screen flex items-center bg-primary py-16 text-primary-foreground"
      >
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Earning?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Join thousands of car owners who are already generating income with their vehicles.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/business/add-listing">List Your Car Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

