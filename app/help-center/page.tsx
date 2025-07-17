import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupportCategories } from "@/components/support-categories"

export default function HelpCenterPage() {
  return (
    <div className="container py-10">
      <div className="mb-10 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Help Center</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Find answers to common questions and learn how to make the most of our car rental services.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for answers..." className="pl-10" />
        </div>
      </div>

      {/* Support Categories */}
      <SupportCategories />

      {/* Popular Topics */}
      <section className="my-12">
        <h2 className="mb-6 text-2xl font-bold">Popular Topics</h2>
        <Tabs defaultValue="rentals">
          <TabsList className="mb-4">
            <TabsTrigger value="rentals">Rentals</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">How do I modify my reservation?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can modify your reservation through your account dashboard or by contacting our customer
                    service.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/modify-reservation">Read more</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">What documents do I need to rent a car?</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll need a valid driver's license, credit card, and in some cases, additional identification.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/required-documents">Read more</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">Can I return the car to a different location?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer one-way rentals at most of our locations for an additional fee.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/one-way-rentals">Read more</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">What is the fuel policy?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our standard policy is "full-to-full" - you receive the car with a full tank and should return it
                    full.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/fuel-policy">Read more</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/payment-methods">Read more</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">When am I charged for my rental?</h3>
                  <p className="text-sm text-muted-foreground">
                    A hold is placed on your card at the time of reservation, with the full amount charged at pickup.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/billing-timing">Read more</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">How do I reset my password?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can reset your password through the login page by clicking on "Forgot password?".
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/reset-password">Read more</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">How do I update my profile information?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can update your profile information in the account settings section of your dashboard.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/update-profile">Read more</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="policies">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">What is your cancellation policy?</h3>
                  <p className="text-sm text-muted-foreground">
                    Cancellations made at least 48 hours before pickup are fully refundable.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/cancellation-policy">Read more</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">What insurance options do you offer?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer several insurance options, including liability coverage and comprehensive protection.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm" asChild>
                    <Link href="/help-center/insurance-options">Read more</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQs */}
      <section className="my-12">
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the minimum age to rent a car?</AccordionTrigger>
            <AccordionContent>
              The minimum age to rent a car is 21 years old. However, drivers under 25 may be subject to a young driver
              surcharge and may have restrictions on certain vehicle categories.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need insurance to rent a car?</AccordionTrigger>
            <AccordionContent>
              While we offer insurance options, you are not required to purchase our insurance if you have coverage
              through your personal auto insurance or credit card. However, proof of insurance is required.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I add an additional driver to my rental?</AccordionTrigger>
            <AccordionContent>
              Yes, you can add additional drivers to your rental. Each additional driver must be present at the time of
              rental with a valid driver's license and may be subject to an additional fee.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What happens if I return the car late?</AccordionTrigger>
            <AccordionContent>
              Late returns may be subject to additional charges. We typically provide a 29-minute grace period, after
              which you may be charged for an additional day. It's always best to contact us if you expect to be late.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Is there a mileage limit on rentals?</AccordionTrigger>
            <AccordionContent>
              Most of our rentals come with unlimited mileage. However, some specialty vehicles or promotional rates may
              have mileage restrictions. Any mileage limitations will be clearly stated in your rental agreement.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact Support */}
      <section className="my-12 rounded-lg bg-muted p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Still Need Help?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Our customer support team is available 24/7 to assist you with any questions or concerns.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button variant="outline">Live Chat</Button>
        </div>
      </section>
    </div>
  )
}

