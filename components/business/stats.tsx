"use client"

import { useState } from "react"
import { Car, Calendar, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BusinessStats() {
  // In a real app, this would fetch data from an API
  const [timeframe, setTimeframe] = useState("week")

  // Mock data
  const statsData = {
    week: {
      listings: 4,
      bookings: 12,
      revenue: 2450,
      growth: 8.2,
    },
    month: {
      listings: 4,
      bookings: 38,
      revenue: 7890,
      growth: 12.5,
    },
    year: {
      listings: 6,
      bookings: 215,
      revenue: 42500,
      growth: 24.8,
    },
  }

  const currentStats = statsData[timeframe as keyof typeof statsData]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.listings}</div>
            <p className="text-xs text-muted-foreground">vehicles listed on the platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.bookings}</div>
            <p className="text-xs text-muted-foreground">
              {timeframe === "week" ? "this week" : timeframe === "month" ? "this month" : "this year"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentStats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {timeframe === "week" ? "this week" : timeframe === "month" ? "this month" : "this year"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{currentStats.growth}%</div>
            <p className="text-xs text-muted-foreground">compared to previous {timeframe}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

