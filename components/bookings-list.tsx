"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Car, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data - in a real app, this would come from an API
const bookingsData = [
  {
    id: "booking-1",
    carId: "car1",
    carName: "Tesla Model S",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 2, 15),
    endDate: new Date(2025, 2, 18),
    location: "New York",
    status: "upcoming",
    totalPrice: 597,
    insurance: true,
  },
  {
    id: "booking-2",
    carId: "car3",
    carName: "Mercedes-Benz E-Class",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 3, 5),
    endDate: new Date(2025, 3, 10),
    location: "Chicago",
    status: "upcoming",
    totalPrice: 945,
    insurance: true,
  },
  {
    id: "booking-3",
    carId: "car2",
    carName: "BMW 5 Series",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 1, 10),
    endDate: new Date(2025, 1, 12),
    location: "Los Angeles",
    status: "completed",
    totalPrice: 358,
    insurance: false,
  },
  {
    id: "booking-4",
    carId: "car4",
    carName: "Range Rover Sport",
    carImage: "/placeholder.svg?height=300&width=500",
    startDate: new Date(2025, 0, 20),
    endDate: new Date(2025, 0, 25),
    location: "Miami",
    status: "completed",
    totalPrice: 1100,
    insurance: true,
  },
]

export function BookingsList() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState(bookingsData)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const filteredBookings = bookings.filter((booking) => activeTab === "all" || booking.status === activeTab)

  const handleCancelBooking = () => {
    if (!cancelBookingId) return

    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      setBookings(
        bookings.map((booking) => (booking.id === cancelBookingId ? { ...booking, status: "cancelled" } : booking)),
      )

      setCancelBookingId(null)
      setIsCancelling(false)

      toast({
        title: "Booking cancelled",
        description: "Your booking has been successfully cancelled.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredBookings.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex border-b">
                    <div className="relative h-32 w-32 flex-shrink-0 sm:h-48 sm:w-48">
                      <Image
                        src={booking.carImage || "/placeholder.svg"}
                        alt={booking.carName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold">{booking.carName}</h3>
                        <BookingStatusBadge status={booking.status} />
                      </div>

                      <div className="mt-1 space-y-1 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>
                            {format(booking.startDate, "MMM d, yyyy")} - {format(booking.endDate, "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Car className="mr-2 h-4 w-4" />
                          <span>{booking.insurance ? "With Insurance" : "No Insurance"}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-2 text-right">
                        <div className="font-medium">Total: ${booking.totalPrice}</div>
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="flex justify-between p-4">
                    <Button variant="outline" asChild>
                      <Link href={`/cars/${booking.carId}`}>View Car</Link>
                    </Button>

                    {booking.status === "upcoming" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-destructive text-destructive hover:bg-destructive/10"
                            onClick={() => setCancelBookingId(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Booking</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel your booking for the {booking.carName}? This action cannot
                              be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-4 flex gap-2 sm:justify-start">
                            <Button variant="destructive" onClick={handleCancelBooking} disabled={isCancelling}>
                              {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                            </Button>
                            <Button variant="outline" onClick={() => setCancelBookingId(null)} disabled={isCancelling}>
                              No, Keep Booking
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {booking.status === "completed" && <Button variant="outline">Leave Review</Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No bookings found</h3>
              <p className="mt-2 text-muted-foreground">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings."
                  : activeTab === "completed"
                    ? "You don't have any completed bookings yet."
                    : activeTab === "cancelled"
                      ? "You don't have any cancelled bookings."
                      : "You don't have any bookings yet."}
              </p>
              <Button className="mt-4" asChild>
                <Link href="/cars">Browse Cars</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
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

