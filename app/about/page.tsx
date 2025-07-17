'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Clock, Shield, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function AboutPage() {
  return (
    <div className="container relative py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-10 space-y-2 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About CarRental</h1>
        <p className="text-xl text-muted-foreground">Learn about our mission, values, and the team behind CarRental.</p>
      </motion.div>

      <div className="grid gap-16">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid gap-6 lg:grid-cols-2 lg:gap-12"
        >
          <motion.div 
            variants={fadeIn}
            className="flex flex-col justify-center space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Founded in 2025, CarRental began with a simple mission: to provide exceptional car rental experiences at
              affordable prices.
            </p>
            <p className="text-lg text-muted-foreground">
              Our commitment to customer satisfaction, transparent pricing, and quality service has earned us the
              loyalty of thousands of satisfied customers.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            className="relative aspect-video overflow-hidden rounded-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src="/placeholder.svg?height=400&width=600" 
              alt="CarRental team" 
              fill 
              className="object-cover transition-transform hover:scale-105" 
            />
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-10"
        >
          <motion.h2 
            variants={fadeIn}
            className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Our Values
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Users className="h-6 w-6" />,
                title: "Customer First",
                description: "We prioritize our customers' needs and strive to exceed their expectations."
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Safety & Quality",
                description: "We maintain the highest standards of vehicle safety and quality through rigorous maintenance protocols."
              },
              {
                icon: <Award className="h-6 w-6" />,
                title: "Integrity",
                description: "We operate with transparency and honesty in all our business practices and customer interactions."
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Efficiency",
                description: "We value your time and have streamlined our processes to make renting a car quick and hassle-free."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                      {value.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-medium">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="py-10"
        >
          <motion.h2 
            variants={fadeIn}
            className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Our Leadership Team
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
              name: "Rohit Kumar",
              role: "Chief Executive Officer",
              image: "/placeholder.svg?height=300&width=300",
              bio: "With over 15 years of experience in the automotive and rental industry, Sarah leads our company with vision and passion.",
            },
            {
              name: "Michael Chen",
              role: "Chief Operations Officer",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Michael oversees our day-to-day operations, ensuring that every location delivers the exceptional service we're known for.",
            },
            {
              name: "David Rodriguez",
              role: "Fleet Manager",
              image: "/placeholder.svg?height=300&width=300",
              bio: "David's expertise in vehicle selection and maintenance ensures our fleet remains modern, reliable, and diverse.",
            },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-6 flex justify-center">
                      <div className="relative h-40 w-40 overflow-hidden rounded-full">
                        <Image 
                          src={member.image} 
                          alt={member.name} 
                          fill 
                          className="object-cover transition-transform hover:scale-110" 
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-medium">{member.name}</h3>
                      <p className="mb-4 text-sm text-primary">{member.role}</p>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="overflow-hidden rounded-3xl bg-primary py-16 text-center text-primary-foreground"
        >
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Join thousands of satisfied customers who trust CarRental for their mobility needs.
            </p>
            <motion.div 
              className="flex justify-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Button asChild size="lg" variant="secondary">
                <Link href="/cars">Browse Our Fleet</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

