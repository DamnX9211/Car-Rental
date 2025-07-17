"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search, Download, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for transactions
const transactionsData = [
  {
    id: "T12345",
    date: new Date(2025, 3, 18),
    description: "Booking payment - B12345",
    amount: 387,
    type: "income",
    status: "completed",
    customer: "John Smith",
    paymentMethod: "Credit Card",
  },
  {
    id: "T12346",
    date: new Date(2025, 3, 25),
    description: "Booking payment - B12346",
    amount: 795,
    type: "income",
    status: "pending",
    customer: "Sarah Johnson",
    paymentMethod: "PayPal",
  },
  {
    id: "T12347",
    date: new Date(2025, 3, 14),
    description: "Booking payment - B12347",
    amount: 290,
    type: "income",
    status: "completed",
    customer: "Michael Brown",
    paymentMethod: "Credit Card",
  },
  {
    id: "T12348",
    date: new Date(2025, 3, 24),
    description: "Booking payment - B12348",
    amount: 330,
    type: "income",
    status: "completed",
    customer: "Emily Davis",
    paymentMethod: "Debit Card",
  },
  {
    id: "T12349",
    date: new Date(2025, 3, 28),
    description: "Platform fee",
    amount: 45,
    type: "expense",
    status: "completed",
    customer: "CarRental Platform",
    paymentMethod: "Automatic Deduction",
  },
  {
    id: "T12350",
    date: new Date(2025, 3, 10),
    description: "Booking payment - B12350",
    amount: 675,
    type: "income",
    status: "refunded",
    customer: "Jennifer Lee",
    paymentMethod: "Credit Card",
  },
  {
    id: "T12351",
    date: new Date(2025, 3, 11),
    description: "Booking payment - B12351",
    amount: 267,
    type: "income",
    status: "completed",
    customer: "David Miller",
    paymentMethod: "Debit Card",
  },
  {
    id: "T12352",
    date: new Date(2025, 3, 15),
    description: "Vehicle maintenance",
    amount: 120,
    type: "expense",
    status: "completed",
    customer: "Auto Service Center",
    paymentMethod: "Bank Transfer",
  },
]

// Stats data
const financialStats = {
  totalRevenue: 18750,
  pendingPayments: 1250,
  expenses: 2340,
  netIncome: 16410,
  growthRate: 12.5,
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter transactions based on active tab, search query, and type filter
  const filteredTransactions = transactionsData.filter((transaction) => {
    // Filter by tab
    if (activeTab === "income" && transaction.type !== "income") return false
    if (activeTab === "expenses" && transaction.type !== "expense") return false

    // Filter by search query
    if (
      searchQuery &&
      !transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by type
    if (typeFilter !== "all" && transaction.status !== typeFilter) return false

    return true
  })

  return (
    <div className="container py-10 min-h-screen">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Finances</h1>
          <p className="text-muted-foreground">Track your revenue, expenses, and manage financial transactions.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Export Financial Report</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{financialStats.growthRate}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialStats.pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((financialStats.pendingPayments / financialStats.totalRevenue) * 100)}% of total revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialStats.expenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((financialStats.expenses / financialStats.totalRevenue) * 100)}% of total revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialStats.netIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground text-green-600 flex items-center">
              <TrendingUp className="mr-1 h-3 w-3" />
              {financialStats.growthRate}% increase
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9 min-w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                        <div className="flex items-center">
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="mr-1 h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-4 w-4" />
                          )}
                          ${transaction.amount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <TransactionStatusBadge status={transaction.status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactionsData.length} transactions
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

function TransactionStatusBadge({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
        Completed
      </Badge>
    )
  } else if (status === "pending") {
    return (
      <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700">
        Pending
      </Badge>
    )
  } else if (status === "refunded") {
    return (
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
        Refunded
      </Badge>
    )
  }
  return null
}

