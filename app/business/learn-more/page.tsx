"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Car,
  Calendar,
  CreditCard,
  BarChart,
  Users,
  Settings,
  PlusCircle,
  FileText,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Smartphone,
  Globe,
  Shield,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Feature sections data
const featureSections = [
  {
    id: "listing-management",
    title: "Listing Management",
    description: "Create and manage your vehicle listings with our intuitive interface.",
    icon: <Car className="h-6 w-6" />,
    features: [
      {
        title: "Easy Listing Creation",
        description:
          "Create detailed vehicle listings with specifications, features, and high-quality photos in minutes.",
        icon: <PlusCircle className="h-5 w-5" />,
      },
      {
        title: "Dynamic Pricing",
        description: "Set different rates for weekdays, weekends, and seasons to maximize your revenue.",
        icon: <CreditCard className="h-5 w-5" />,
      },
      {
        title: "Availability Calendar",
        description: "Manage when your vehicles are available for rent with an easy-to-use calendar interface.",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Performance Analytics",
        description: "Track how your listings are performing with detailed analytics and insights.",
        icon: <BarChart className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "booking-management",
    title: "Booking Management",
    description: "Track and manage all your bookings in real-time.",
    icon: <Calendar className="h-6 w-6" />,
    features: [
      {
        title: "Real-time Calendar",
        description: "View all your bookings in a calendar view for easy scheduling and management.",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Automated Notifications",
        description: "Send automatic reminders to customers about upcoming bookings and returns.",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Booking Workflow",
        description: "Streamlined process from booking request to completion and review.",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Conflict Resolution",
        description: "Tools to help manage booking conflicts and customer issues efficiently.",
        icon: <Shield className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "financial-tools",
    title: "Financial Tools",
    description: "Monitor your earnings, track payments, and analyze your business performance.",
    icon: <CreditCard className="h-6 w-6" />,
    features: [
      {
        title: "Revenue Dashboard",
        description: "Visual overview of your earnings, expenses, and profit margins.",
        icon: <BarChart className="h-5 w-5" />,
      },
      {
        title: "Payment Processing",
        description: "Secure payment processing with multiple payment options for customers.",
        icon: <CreditCard className="h-5 w-5" />,
      },
      {
        title: "Financial Reports",
        description: "Generate detailed financial reports for accounting and tax purposes.",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Revenue Optimization",
        description: "Tools and insights to help you maximize your rental income.",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "customer-management",
    title: "Customer Management",
    description: "Build relationships with your customers and manage their information.",
    icon: <Users className="h-6 w-6" />,
    features: [
      {
        title: "Customer Profiles",
        description: "Detailed customer information including rental history and preferences.",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Communication Tools",
        description: "Direct messaging and email templates for customer communication.",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Feedback Management",
        description: "Collect, analyze, and respond to customer feedback and reviews.",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Loyalty Programs",
        description: "Create and manage loyalty programs to encourage repeat business.",
        icon: <Shield className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "mobile-features",
    title: "Mobile Features",
    description: "Manage your business on the go with our mobile-friendly platform.",
    icon: <Smartphone className="h-6 w-6" />,
    features: [
      {
        title: "Responsive Design",
        description: "Access your business dashboard from any device with our responsive interface.",
        icon: <Globe className="h-5 w-5" />,
      },
      {
        title: "Mobile Notifications",
        description: "Receive real-time notifications about bookings and customer inquiries.",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Quick Actions",
        description: "Perform common tasks quickly from your mobile device.",
        icon: <Clock className="h-5 w-5" />,
      },
      {
        title: "Offline Capabilities",
        description: "Access key information even when you're offline.",
        icon: <Shield className="h-5 w-5" />,
      },
    ],
  },
]

// Pricing plans data
const pricingPlans = [
  {
    name: "Basic",
    price: "$49",
    description: "Perfect for individuals with a small fleet",
    features: [
      "Up to 5 vehicle listings",
      "Basic booking management",
      "Standard financial reports",
      "Email support",
      "Mobile access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for growing rental businesses",
    features: [
      "Up to 20 vehicle listings",
      "Advanced booking management",
      "Detailed financial analytics",
      "Priority email support",
      "Customer management tools",
      "Marketing tools",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For established rental companies",
    features: [
      "Unlimited vehicle listings",
      "Premium booking management",
      "Advanced analytics and reporting",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

// FAQ data
const faqs = [
  {
    question: "How do I get started with the business portal?",
    answer:
      "Getting started is easy! Simply click the 'Get Started' button, create your account, and follow the guided setup process. You'll be able to add your first vehicle listing in minutes.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We support all major credit cards, PayPal, and bank transfers. Payments are processed securely through our platform, and you can set up automatic transfers to your bank account.",
  },
  {
    question: "How much commission do you charge?",
    answer:
      "Our commission structure is transparent and competitive. We charge a 10% commission on each booking, with volume discounts available for Professional and Enterprise plans.",
  },
  {
    question: "Can I manage multiple locations?",
    answer:
      "Yes, our Professional and Enterprise plans support multiple locations. You can manage different fleets, pricing, and availability for each location from a single dashboard.",
  },
  {
    question: "How do I handle customer support issues?",
    answer:
      "Our platform includes built-in customer communication tools. You can respond to inquiries, resolve issues, and manage customer expectations directly through the dashboard.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "While we don't have a dedicated mobile app yet, our platform is fully responsive and works seamlessly on mobile browsers, allowing you to manage your business on the go.",
  },
  {
    question: "Can I integrate with my existing systems?",
    answer:
      "Enterprise plan users have access to our API for custom integrations with existing systems like accounting software, CRM platforms, and fleet management tools.",
  },
  {
    question: "What happens if a customer damages my vehicle?",
    answer:
      "We have a comprehensive damage resolution process. Our platform helps you document damage, process security deposits, and manage insurance claims efficiently.",
  },
]

export default function LearnMorePage() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Grow Your Car Rental Business
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our business portal provides all the tools you need to manage your fleet, streamline bookings, and
              maximize your revenue.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link href="/business/add-listing">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Your First Listing
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16" id="main-content">
        <div className="container">
          <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-10">
              <div className="space-y-16">
                {featureSections.map((section, index) => (
                  <div key={section.id} id={section.id} className="scroll-mt-20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">{section.icon}</div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                      </div>

                      <p className="text-muted-foreground mb-8 max-w-3xl">{section.description}</p>

                      <div className="grid gap-6 md:grid-cols-2">
                        {section.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                          >
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-primary/10 p-2 text-primary">{feature.icon}</div>
                                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-bold">Transparent Pricing Plans</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Choose the plan that fits your business needs. All plans include our core platform features.
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-3">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`relative h-full flex flex-col ${plan.popular ? "border-primary shadow-md" : ""}`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="mt-4">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground"> / month</span>
                        </div>
                        <CardDescription className="mt-2">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <ul className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className={`w-full ${plan.popular ? "" : "bg-primary/90 hover:bg-primary"}`} asChild>
                          <Link href="/business/signup">{plan.cta}</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Need a custom solution for your large fleet?</p>
                <Button variant="outline" asChild>
                  <Link href="/business/contact">Contact Our Sales Team</Link>
                </Button>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about our business portal.
                </p>
              </motion.div>

              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">Still have questions?</p>
                <Button asChild>
                  <Link href="/business/contact">Contact Support</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Grow Your Rental Business?
            </motion.h2>
            <motion.p
              className="mt-4 text-primary-foreground/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of car rental businesses already using our platform to increase bookings and streamline
              operations.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="secondary" size="lg" asChild>
                <Link href="/business/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

