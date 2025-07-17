import { notFound } from "next/navigation"
import { BookingDetails } from "@/components/booking-details"

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the booking data based on the ID
  // For now, we'll just check if the ID exists in our mock data
  const validIds = ["booking-1", "booking-2", "booking-3", "booking-4"]

  if (!validIds.includes(params.id)) {
    notFound()
  }

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Booking Details</h1>
      <BookingDetails bookingId={params.id} />
    </div>
  )
}

