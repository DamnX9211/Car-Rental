"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, MapPin, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data - in a real app, this would come from an API
const bookingsData = {
  "booking-1": {
    id: "booking-1",
    carId: "car1",
    carName: "Tesla Model S",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 2, 15),
    endDate: new Date(2025, 2, 18),
    pickupTime: "10:00 AM",
    returnTime: "6:00 PM",
    location: "New York",
    pickupAddress: "123 Main St, New York, NY 10001",
    status: "upcoming",
    totalPrice: 597,
    subtotal: 597,
    insurance: true,
    insuranceCost: 57,
    bookingDate: new Date(2025, 1, 20),
    confirmationNumber: "CR-12345-NY",
    paymentMethod: "Visa ending in 4242",
  },
  "booking-2": {
    id: "booking-2",
    carId: "car3",
    carName: "Mercedes-Benz E-Class",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 3, 5),
    endDate: new Date(2025, 3, 10),
    pickupTime: "9:00 AM",
    returnTime: "5:00 PM",
    location: "Chicago",
    pickupAddress: "456 Lake St, Chicago, IL 60601",
    status: "upcoming",
    totalPrice: 945,
    subtotal: 945,
    insurance: true,
    insuranceCost: 95,
    bookingDate: new Date(2025, 2, 1),
    confirmationNumber: "CR-67890-CH",
    paymentMethod: "Mastercard ending in 5678",
  },
  "booking-3": {
    id: "booking-3",
    carId: "car2",
    carName: "BMW 5 Series",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 1, 10),
    endDate: new Date(2025, 1, 12),
    pickupTime: "11:00 AM",
    returnTime: "4:00 PM",
    location: "Los Angeles",
    pickupAddress: "789 Palm Ave, Los Angeles, CA 90001",
    status: "completed",
    totalPrice: 358,
    subtotal: 358,
    insurance: false,
    insuranceCost: 0,
    bookingDate: new Date(2025, 0, 15),
    confirmationNumber: "CR-24680-LA",
    paymentMethod: "American Express ending in 1234",
  },
  "booking-4": {
    id: "booking-4",
    carId: "car4",
    carName: "Range Rover Sport",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 0, 20),
    endDate: new Date(2025, 0, 25),
    pickupTime: "10:00 AM",
    returnTime: "6:00 PM",
    location: "Miami",
    pickupAddress: "321 Ocean Dr, Miami, FL 33101",
    status: "completed",
    totalPrice: 1100,
    subtotal: 1100,
    insurance: true,
    insuranceCost: 100,
    bookingDate: new Date(2024, 11, 30),
    confirmationNumber: "CR-13579-MI",
    paymentMethod: "Visa ending in 9876",
  },
}

export function BookingDetails({ bookingId }: { bookingId: string }) {
  const { toast } = useToast()
  const [booking, setBooking] = useState(bookingsData[bookingId])
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancelBooking = () => {
    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      setBooking({ ...booking, status: "cancelled" })
      setIsCancelling(false)

      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/account/bookings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to bookings
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Booking #{booking.confirmationNumber}</CardTitle>
              <BookingStatusBadge status={booking.status} />
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative aspect-video h-40 w-full overflow-hidden rounded-md sm:w-64">
                  <Image
                    src={booking.carImage || "/placeholder.svg"}
                    alt={booking.carName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{booking.carName}</h3>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>
                        {format(booking.startDate, "MMM d, yyyy")} - {format(booking.endDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        Pickup: {booking.pickupTime} | Return: {booking.returnTime}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/cars/${booking.carId}`}>View Car Details</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2 font-medium">Pickup & Return Information</h4>
                <div className="rounded-md border p-4">
                  <div className="mb-4">
                    <div className="text-sm font-medium">Pickup Location</div>
                    <div className="text-sm text-muted-foreground">{booking.pickupAddress}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {format(booking.startDate, "EEEE, MMMM d, yyyy")} at {booking.pickupTime}
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div>
                    <div className="text-sm font-medium">Return Location</div>
                    <div className="text-sm text-muted-foreground">{booking.pickupAddress}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {format(booking.endDate, "EEEE, MMMM d, yyyy")} at {booking.returnTime}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            {booking.status === "upcoming" && (
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      Cancel Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Booking</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel your booking for the {booking.carName}? This action cannot be
                        undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex gap-2 sm:justify-start">
                      <Button variant="destructive" onClick={handleCancelBooking} disabled={isCancelling}>
                        {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                      </Button>
                      <Button variant="outline" disabled={isCancelling}>
                        No, Keep Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Booking Date</div>
                <div className="text-sm text-muted-foreground">{format(booking.bookingDate, "MMMM d, yyyy")}</div>
              </div>

              <div>
                <div className="text-sm font-medium">Payment Method</div>
                <div className="text-sm text-muted-foreground">{booking.paymentMethod}</div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rental Subtotal</span>
                  <span>${booking.subtotal}</span>
                </div>

                {booking.insurance && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Insurance</span>
                    <span>${booking.insuranceCost}</span>
                  </div>
                )}

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${booking.totalPrice}</span>
                </div>
              </div>

              <Separator />

              <div className="rounded-md bg-muted p-3 text-sm">
                <div className="flex items-start">
                  <User className="mr-2 mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Driver Information</div>
                    <div className="text-muted-foreground">
                      Please bring your valid driver's license and the credit card used for booking.
                    </div>
                  </div>
                </div>
              </div>

              {booking.insurance && (
                <div className="rounded-md bg-muted p-3 text-sm">
                  <div className="flex items-start">
                    <Shield className="mr-2 mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Insurance Coverage</div>
                      <div className="text-muted-foreground">
                        Your booking includes comprehensive insurance coverage.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BookingStatusBadge({ status }: { status: string }) {
  if (status === "upcoming") {
    return (
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
        Upcoming
      </Badge>
    )
  } else if (status === "completed") {
    return (
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
        Completed
      </Badge>
    )
  } else if (status === "cancelled") {
    return (
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
        Cancelled
      </Badge>
    )
  }
  return null
}

