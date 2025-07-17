import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for recent bookings
const recentBookings = [
  {
    id: "B12345",
    customerName: "John Smith",
    carName: "Tesla Model 3",
    startDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 3, 18),
    status: "confirmed",
    amount: 387,
  },
  {
    id: "B12346",
    customerName: "Sarah Johnson",
    carName: "Mercedes-Benz GLC",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 3, 25),
    status: "pending",
    amount: 795,
  },
  {
    id: "B12347",
    customerName: "Michael Brown",
    carName: "BMW 3 Series",
    startDate: new Date(2025, 3, 12),
    endDate: new Date(2025, 3, 14),
    status: "completed",
    amount: 290,
  },
  {
    id: "B12348",
    customerName: "Emily Davis",
    carName: "Audi Q5",
    startDate: new Date(2025, 3, 22),
    endDate: new Date(2025, 3, 24),
    status: "confirmed",
    amount: 330,
  },
  {
    id: "B12349",
    customerName: "Robert Wilson",
    carName: "Tesla Model 3",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 4, 2),
    status: "pending",
    amount: 645,
  },
]

export function RecentBookings() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{booking.carName}</TableCell>
              <TableCell>
                {format(booking.startDate, "MMM d")} - {format(booking.endDate, "MMM d, yyyy")}
              </TableCell>
              <TableCell>${booking.amount}</TableCell>
              <TableCell>
                <BookingStatusBadge status={booking.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/business/bookings/${booking.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-4">
        <p className="text-sm text-muted-foreground">
          Showing {recentBookings.length} of {recentBookings.length} bookings
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/business/bookings">View All Bookings</Link>
        </Button>
      </div>
    </div>
  )
}

function BookingStatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
        Confirmed
      </Badge>
    )
  } else if (status === "pending") {
    return (
      <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700">
        Pending
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

