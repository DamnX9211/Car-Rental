"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  PlusCircle,
  Calendar,
  TrendingUp,
  Users,
  ArrowRight,
  Info,
  CheckCircle,
  Settings,
  BarChart,
  Car,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface BusinessToolProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  tooltipText: string
  dialogTitle: string
  dialogDescription: string
  dialogContent: React.ReactNode
}

const businessTools: BusinessToolProps[] = [
  {
    icon: <PlusCircle className="h-6 w-6 text-primary" />,
    title: "Easy Listing Management",
    description: "Create and manage your vehicle listings with our intuitive interface.",
    href: "/business/add-listing",
    tooltipText: "Add and manage your vehicle listings",
    dialogTitle: "Listing Management",
    dialogDescription: "Our powerful listing management tools help you maximize your rental income.",
    dialogContent: (
      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Detailed Vehicle Profiles</h4>
            <p className="text-sm text-muted-foreground">
              Create comprehensive listings with specifications, features, and high-quality photos.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Dynamic Pricing</h4>
            <p className="text-sm text-muted-foreground">
              Set different rates for weekdays, weekends, and seasons to maximize revenue.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Availability Calendar</h4>
            <p className="text-sm text-muted-foreground">Easily manage when your vehicles are available for rent.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Performance Analytics</h4>
            <p className="text-sm text-muted-foreground">
              Track how your listings are performing with detailed analytics.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Booking Management",
    description: "Track and manage all your bookings in real-time.",
    href: "/business/bookings",
    tooltipText: "Manage your rental bookings",
    dialogTitle: "Booking Management System",
    dialogDescription: "Our booking management system helps you stay organized and provide excellent service.",
    dialogContent: (
      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Real-time Calendar</h4>
            <p className="text-sm text-muted-foreground">
              View all your bookings in a calendar view for easy scheduling.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Automated Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Send automatic reminders to customers about upcoming bookings.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Booking Workflow</h4>
            <p className="text-sm text-muted-foreground">
              Streamlined process from booking request to completion and review.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Conflict Resolution</h4>
            <p className="text-sm text-muted-foreground">Tools to help manage booking conflicts and customer issues.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Revenue Tracking",
    description: "Monitor your earnings, track payments, and analyze your business performance.",
    href: "/business/payments",
    tooltipText: "Track your financial performance",
    dialogTitle: "Financial Management Tools",
    dialogDescription: "Comprehensive tools to track and optimize your rental business finances.",
    dialogContent: (
      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Revenue Dashboard</h4>
            <p className="text-sm text-muted-foreground">
              Visual overview of your earnings, expenses, and profit margins.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Payment Processing</h4>
            <p className="text-sm text-muted-foreground">
              Secure payment processing with multiple payment options for customers.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Financial Reports</h4>
            <p className="text-sm text-muted-foreground">
              Generate detailed financial reports for accounting and tax purposes.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Revenue Optimization</h4>
            <p className="text-sm text-muted-foreground">Tools and insights to help you maximize your rental income.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Customer Management",
    description: "Build relationships with your customers and manage their information.",
    href: "/business/customers",
    tooltipText: "Manage your customer relationships",
    dialogTitle: "Customer Relationship Management",
    dialogDescription: "Tools to help you build and maintain strong relationships with your customers.",
    dialogContent: (
      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Customer Profiles</h4>
            <p className="text-sm text-muted-foreground">
              Detailed customer information including rental history and preferences.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Communication Tools</h4>
            <p className="text-sm text-muted-foreground">
              Direct messaging and email templates for customer communication.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Loyalty Programs</h4>
            <p className="text-sm text-muted-foreground">
              Create and manage loyalty programs to encourage repeat business.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Feedback Management</h4>
            <p className="text-sm text-muted-foreground">
              Collect, analyze, and respond to customer feedback and reviews.
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

export function InteractiveBusinessTools() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <TooltipProvider>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {businessTools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center">
                  {tool.icon}
                </div>
                <CardTitle className="flex items-center gap-2">
                  {tool.title}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tool.tooltipText}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href={tool.href}>
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{tool.dialogTitle}</DialogTitle>
                      <DialogDescription>{tool.dialogDescription}</DialogDescription>
                    </DialogHeader>
                    {tool.dialogContent}
                    <DialogFooter className="mt-4">
                      <Button asChild>
                        <Link href={tool.href}>Get Started</Link>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  )
}

export function BusinessDashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/business/add-listing">
                <Car className="h-4 w-4" />
                Add New Listing
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/business/bookings">
                <Calendar className="h-4 w-4" />
                View Bookings
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/business/payments">
                <CreditCard className="h-4 w-4" />
                Financial Overview
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/business/analytics">
                <BarChart className="h-4 w-4" />
                Analytics Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="md:col-span-2"
      >
        <Card className="hover:shadow-md transition-all h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Detailed analytics are available after you add your first listing and receive bookings.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/business/analytics">View Analytics</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

