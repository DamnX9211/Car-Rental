"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"

export function SearchForm() {
  const router = useRouter()
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    location: false,
    pickupDate: false,
    returnDate: false,
  })

  const validateForm = () => {
    const newErrors = {
      location: !location,
      pickupDate: !pickupDate,
      returnDate: !returnDate,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const searchParams = new URLSearchParams()
    searchParams.set("location", location)
    searchParams.set("pickup", format(pickupDate, "yyyy-MM-dd"))
    searchParams.set("return", format(returnDate, "yyyy-MM-dd"))

    // Simulate a slight delay for better UX
    setTimeout(() => {
      router.push(`/cars?${searchParams.toString()}`)
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      className="w-full max-w-4xl glass-effect rounded-2xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Search for available cars"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Label htmlFor="location-select" className="text-sm font-medium text-white mb-1 block">
            Location{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </Label>
          <Select
            onValueChange={setLocation}
            value={location}
            name="location"
            aria-invalid={errors.location}
            aria-required="true"
          >
            <SelectTrigger
              id="location-select"
              className={cn(
                "h-[54px] bg-white/20 border-0 text-white backdrop-blur-sm focus:ring-2 focus:ring-primary",
                errors.location && "border-red-400 ring-2 ring-red-400",
              )}
            >
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
              <SelectItem value="las-vegas">Las Vegas</SelectItem>
            </SelectContent>
          </Select>
          {errors.location && <p className="text-sm text-red-400 mt-1">Please select a location</p>}
        </div>

        <div className="flex-1">
          <Label htmlFor="pickup-date" className="text-sm font-medium text-white mb-1 block">
            Pick-up Date{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="pickup-date"
                variant="outline"
                className={cn(
                  "h-[54px] w-full justify-start text-left font-normal bg-white/20 border-0 text-white backdrop-blur-sm hover:bg-white/30 focus:ring-2 focus:ring-primary",
                  !pickupDate && "text-white/70",
                  errors.pickupDate && "border-red-400 ring-2 ring-red-400",
                )}
                aria-invalid={errors.pickupDate}
                aria-required="true"
              >
                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                {pickupDate ? format(pickupDate, "PPP") : <span>Pick-up Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={(date) => {
                  setPickupDate(date)
                  // Reset return date if it's before the new pickup date
                  if (returnDate && date && date > returnDate) {
                    setReturnDate(undefined)
                  }
                }}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.pickupDate && <p className="text-sm text-red-400 mt-1">Please select a pick-up date</p>}
        </div>

        <div className="flex-1">
          <Label htmlFor="return-date" className="text-sm font-medium text-white mb-1 block">
            Return Date{" "}
            <span className="text-red-400" aria-hidden="true">
              *
            </span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="return-date"
                variant="outline"
                className={cn(
                  "h-[54px] w-full justify-start text-left font-normal bg-white/20 border-0 text-white backdrop-blur-sm hover:bg-white/30 focus:ring-2 focus:ring-primary",
                  !returnDate && "text-white/70",
                  errors.returnDate && "border-red-400 ring-2 ring-red-400",
                )}
                aria-invalid={errors.returnDate}
                aria-required="true"
              >
                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                {returnDate ? format(returnDate, "PPP") : <span>Return Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                disabled={(date) => date < (pickupDate || new Date())}
              />
            </PopoverContent>
          </Popover>
          {errors.returnDate && <p className="text-sm text-red-400 mt-1">Please select a return date</p>}
        </div>

        <div className="flex items-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="h-[54px] w-full md:w-auto px-8 rounded-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              {isSubmitting ? "Searching..." : "Search"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.form>
  )
}

