import { BookingsList } from "@/components/bookings-list"

export default function BookingsPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Bookings</h1>
      <BookingsList />
    </div>
  )
}

