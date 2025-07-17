import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQsPage() {
  return (
    <div className="container py-10">
      <div className="mb-10 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Find answers to the most common questions about our car rental services.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Reservations & Bookings</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I make a reservation?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">You can make a reservation in several ways:</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Through our website by using the search form on the homepage</li>
                  <li>By calling our reservation center at (555) 123-4567</li>
                  <li>By visiting any of our branch locations in person</li>
                  <li>Through our mobile app (available on iOS and Android)</li>
                </ul>
                <p className="mt-2">
                  To complete your reservation, you'll need to provide your pickup and return dates, location, and
                  vehicle preferences.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I modify or cancel my reservation?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, you can modify or cancel your reservation through your account dashboard or by contacting our
                  customer service. Cancellations made at least 48 hours before the scheduled pickup time are eligible
                  for a full refund. Modifications are subject to vehicle availability and may result in price
                  adjustments.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a fee if I cancel my reservation?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Cancellations made at least 48 hours before the scheduled pickup time are free of charge.
                  Cancellations made within 48 hours of the pickup time may be subject to a cancellation fee of up to
                  one day's rental charge. No-shows (failing to pick up the vehicle without cancelling) may be charged
                  the full reservation amount.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What happens if I'm late for my pickup?</AccordionTrigger>
              <AccordionContent>
                <p>
                  We hold reservations for up to 2 hours after the scheduled pickup time. If you're running late, please
                  contact us to ensure your vehicle remains available. After 2 hours, the reservation may be cancelled,
                  and a no-show fee may apply. For airport pickups, we monitor flight information and will hold your
                  reservation if your flight is delayed.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Rental Requirements</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-5">
              <AccordionTrigger>What documents do I need to rent a car?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">To rent a car, you'll need to provide:</p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>A valid driver's license</li>
                  <li>A major credit card in the renter's name</li>
                  <li>Proof of insurance (or purchase of our insurance)</li>
                  <li>A second form of ID may be required (passport, ID card, etc.)</li>
                </ul>
                <p className="mt-2">
                  International customers will need a valid driver's license from their home country, an International
                  Driving Permit (if required), and a passport.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>What is the minimum age to rent a car?</AccordionTrigger>
              <AccordionContent>
                <p>
                  The minimum age to rent a car is 21 years old. However, drivers under 25 may be subject to a young
                  driver surcharge and may have restrictions on certain vehicle categories, particularly luxury and
                  high-performance vehicles. The young driver surcharge typically ranges from $15-$35 per day, depending
                  on the location and vehicle type.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Can I rent a car without a credit card?</AccordionTrigger>
              <AccordionContent>
                <p>
                  A credit card in the primary driver's name is typically required for the security deposit. In some
                  locations, we may accept debit cards with additional verification, such as proof of return travel,
                  utility bills, and an additional form of ID. Cash, prepaid cards, and gift cards are not accepted for
                  the security deposit. Please contact your desired rental location for their specific payment policies.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Payments & Charges</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-8">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                <p>
                  We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. The
                  credit card must be in the name of the primary renter. For the actual rental charges (not the security
                  deposit), we also accept debit cards and digital payment methods like Apple Pay and Google Pay at most
                  locations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>How much is the security deposit?</AccordionTrigger>
              <AccordionContent>
                <p>
                  The security deposit amount varies based on the vehicle category and rental location, typically
                  ranging from $200 to $500. For luxury and specialty vehicles, the deposit may be higher. This amount
                  is pre-authorized (not charged) on your credit card at the time of pickup and released upon the
                  vehicle's return, provided there are no additional charges.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>When am I charged for my rental?</AccordionTrigger>
              <AccordionContent>
                <p>
                  A pre-authorization hold is placed on your credit card at the time of pickup for the estimated total
                  rental amount plus a security deposit. The final charge is processed upon return of the vehicle,
                  reflecting the actual rental duration and any additional charges such as fuel, late fees, or damages.
                  If you prepay your reservation online, only the security deposit is held at pickup.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">During Your Rental</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-11">
              <AccordionTrigger>What is the fuel policy?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our standard fuel policy is "full-to-full." This means you'll receive the vehicle with a full tank of
                  gas and are expected to return it with a full tank. If the vehicle is not returned with a full tank,
                  you'll be charged for the missing fuel plus a refueling service fee. We also offer a prepaid fuel
                  option, allowing you to pay for a full tank upfront and return the car with any fuel level.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger>Can I add an additional driver?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, you can add additional drivers to your rental. Each additional driver must be present at the time
                  of rental with a valid driver's license and must meet the same age and eligibility requirements as the
                  primary renter. There is typically a fee of $10-$15 per day for each additional driver, with a maximum
                  charge per rental period. Spouses or domestic partners may be exempt from this fee in some locations.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13">
              <AccordionTrigger>What happens if I have an accident or the car breaks down?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">In case of an accident or breakdown, follow these steps:</p>
                <ol className="ml-6 list-decimal space-y-1">
                  <li>Ensure everyone's safety and call emergency services if needed</li>
                  <li>Contact our 24/7 roadside assistance at (555) 999-8888</li>
                  <li>Document the incident with photos and collect information from other parties if applicable</li>
                  <li>File a police report for accidents</li>
                  <li>Complete our incident report form (available in the glove compartment)</li>
                </ol>
                <p className="mt-2">
                  We provide 24/7 roadside assistance for all rentals. Depending on your coverage, costs for towing,
                  lockout service, battery jump-start, etc., may be included or charged separately.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">Returns & Extensions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-14">
              <AccordionTrigger>Can I return the car to a different location?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, one-way rentals are available at most locations for an additional fee. The one-way fee varies
                  based on the distance between locations and vehicle type. One-way rentals between certain city pairs
                  may have reduced fees or promotions. Please specify your return location at the time of reservation,
                  as changing the return location during your rental may result in higher fees.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15">
              <AccordionTrigger>How do I extend my rental?</AccordionTrigger>
              <AccordionContent>
                <p>
                  To extend your rental, contact our customer service at least 24 hours before your scheduled return
                  time. Extensions are subject to vehicle availability and may result in a rate adjustment. If you fail
                  to extend your rental and return the vehicle late, late fees will apply, and you may lose any special
                  rates applied to your original reservation.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-16">
              <AccordionTrigger>What happens if I return the car late?</AccordionTrigger>
              <AccordionContent>
                <p>
                  We provide a 29-minute grace period for returns. After that, you may be charged for an additional day
                  or hourly late fees, depending on how late the return is. If you know you'll be returning late,
                  contact us as soon as possible to extend your rental and avoid higher late fees. Repeatedly returning
                  vehicles late may affect your ability to rent with us in the future.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <div className="mt-12 rounded-lg bg-muted p-8 text-center">
          <h2 className="mb-4 text-xl font-bold">Didn't Find Your Answer?</h2>
          <p className="mb-6 text-muted-foreground">
            Our customer support team is ready to assist you with any other questions you might have.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help-center">Visit Help Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

