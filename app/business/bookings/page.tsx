"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Search, Calendar, Download, ChevronDown, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for bookings
const bookingsData = [
  {
    id: "B12345",
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    customerPhone: "+1 (555) 123-4567",
    carName: "Tesla Model 3",
    startDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 3, 18),
    status: "confirmed",
    amount: 387,
    location: "New York",
  },
  {
    id: "B12346",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    customerPhone: "+1 (555) 987-6543",
    carName: "Mercedes-Benz GLC",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 3, 25),
    status: "pending",
    amount: 795,
    location: "Los Angeles",
  },
  {
    id: "B12347",
    customerName: "Michael Brown",
    customerEmail: "mbrown@example.com",
    customerPhone: "+1 (555) 456-7890",
    carName: "BMW 3 Series",
    startDate: new Date(2025, 3, 12),
    endDate: new Date(2025, 3, 14),
    status: "completed",
    amount: 290,
    location: "Chicago",
  },
  {
    id: "B12348",
    customerName: "Emily Davis",
    customerEmail: "emily.d@example.com",
    customerPhone: "+1 (555) 234-5678",
    carName: "Audi Q5",
    startDate: new Date(2025, 3, 22),
    endDate: new Date(2025, 3, 24),
    status: "confirmed",
    amount: 330,
    location: "Miami",
  },
  {
    id: "B12349",
    customerName: "Robert Wilson",
    customerEmail: "rwilson@example.com",
    customerPhone: "+1 (555) 876-5432",
    carName: "Tesla Model 3",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 4, 2),
    status: "pending",
    amount: 645,
    location: "New York",
  },
  {
    id: "B12350",
    customerName: "Jennifer Lee",
    customerEmail: "jlee@example.com",
    customerPhone: "+1 (555) 345-6789",
    carName: "Jeep Wrangler",
    startDate: new Date(2025, 3, 5),
    endDate: new Date(2025, 3, 10),
    status: "cancelled",
    amount: 675,
    location: "Denver",
  },
  {
    id: "B12351",
    customerName: "David Miller",
    customerEmail: "dmiller@example.com",
    customerPhone: "+1 (555) 567-8901",
    carName: "Toyota Camry",
    startDate: new Date(2025, 3, 8),
    endDate: new Date(2025, 3, 11),
    status: "completed",
    amount: 267,
    location: "Chicago",
  },
  {
    id: "B12352",
    customerName: "Lisa Anderson",
    customerEmail: "lisa.a@example.com",
    customerPhone: "+1 (555) 678-9012",
    carName: "BMW 3 Series",
    startDate: new Date(2025, 4, 3),
    endDate: new Date(2025, 4, 7),
    status: "confirmed",
    amount: 580,
    location: "Chicago",
  },
]

// Stats data
const statsData = {
  totalBookings: 124,
  confirmedBookings: 78,
  pendingBookings: 32,
  cancelledBookings: 14,
  totalRevenue: 18750,
  averageBookingValue: 151,
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter bookings based on active tab, search query, and status filter
  const filteredBookings = bookingsData.filter((booking) => {
    // Filter by tab
    if (activeTab !== "all" && booking.status !== activeTab) return false

    // Filter by search query
    if (
      searchQuery &&
      !booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.carName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && booking.status !== statusFilter) return false

    return true
  })

  return (
    <div className="container py-10 min-h-screen">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage and track all your vehicle bookings in one place.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Calendar View</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.confirmedBookings}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((statsData.confirmedBookings / statsData.totalBookings) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statsData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statsData.averageBookingValue}</div>
            <p className="text-xs text-muted-foreground">Per booking</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-9 min-w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-xs text-muted-foreground">{booking.customerEmail}</div>
                      </TableCell>
                      <TableCell>{booking.carName}</TableCell>
                      <TableCell>
                        {format(booking.startDate, "MMM d")} - {format(booking.endDate, "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{booking.location}</TableCell>
                      <TableCell>${booking.amount}</TableCell>
                      <TableCell>
                        <BookingStatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span>Actions</span>
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/business/bookings/${booking.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {booking.status === "pending" && <DropdownMenuItem>Confirm Booking</DropdownMenuItem>}
                            {(booking.status === "pending" || booking.status === "confirmed") && (
                              <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                            )}
                            {booking.status === "completed" && (
                              <DropdownMenuItem>Send Feedback Request</DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBookings.length} of {bookingsData.length} bookings
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookingStatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 flex items-center gap-1">
        <CheckCircle2 className="h-3 w-3" />
        <span>Confirmed</span>
      </Badge>
    )
  } else if (status === "pending") {
    return (
      <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>Pending</span>
      </Badge>
    )
  } else if (status === "completed") {
    return (
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 flex items-center gap-1">
        <CheckCircle2 className="h-3 w-3" />
        <span>Completed</span>
      </Badge>
    )
  } else if (status === "cancelled") {
    return (
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        <span>Cancelled</span>
      </Badge>
    )
  }
  return null
}

