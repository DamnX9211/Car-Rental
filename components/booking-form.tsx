"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, differenceInDays } from "date-fns"
import { CalendarIcon, CheckCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"

interface BookingFormProps {
  carId: string
  carName: string
  pricePerDay: number
}

export function BookingForm({ carId, carName, pricePerDay }: BookingFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, showAuthModal } = useAuth?.() || { user: null, showAuthModal: () => {} }
  
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [pickupTime, setPickupTime] = useState("")
  const [returnTime, setReturnTime] = useState("")
  const [addInsurance, setAddInsurance] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const days = pickupDate && returnDate ? differenceInDays(returnDate, pickupDate) : 0
  const insuranceCost = 19
  const subtotal = days * pricePerDay
  const insuranceTotal = addInsurance ? days * insuranceCost : 0
  const total = subtotal + insuranceTotal
  
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      // If not logged in, show auth modal
      showAuthModal()
      return
    }
    
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      toast({
        title: "Missing information",
        description: "Please select all required dates and times",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Booking confirmed!",
        description: `You've successfully booked the ${carName}.`,
        variant: "default"
      })
      router.push("/account/bookings")
    }, 1500)
  }

  return (
    <form onSubmit={handleBooking}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="pickup-date">Pick-up Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="pickup-date"
                variant="outline"
                className={cn(
                  "mt-1 w-full justify-start text-left font-normal",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={(date) => {
                  setPickupDate(date)
                  // If return date is before new pickup date, reset return date
                  if (returnDate && date && date > returnDate) {
                    setReturnDate(undefined)
                  }
                }}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="pickup-time">Pick-up Time</Label>
          <Select value={pickupTime} onValueChange={setPickupTime}>
            <SelectTrigger id="pickup-time" className="mt-1 w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="return-date">Return Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="return-date"
                variant="outline"
                className={cn(
                  "mt-1 w-full justify-start text-left font-normal",
                  !returnDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
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
        </div>
        
        <div>
          <Label htmlFor="return-time">Return Time</Label>
          <Select value={returnTime} onValueChange={setReturnTime}>
            <SelectTrigger id="return-time" className="mt-1 w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-start space-x-2 rounded-md border p-4">
          <Checkbox
            id="insurance"
            checked={addInsurance}
            onCheckedChange={(checked) => 
              setAddInsurance(checked as boolean)
            }
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="insurance"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add Insurance Protection
            </Label>
            <p className="text-sm text-muted-foreground">
              ${insuranceCost}/day for comprehensive coverage and peace of mind.
            </p>
          </div>
        </div>
        
        {days > 0 && (
          <div className="space-y-2 rounded-md border p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">${pricePerDay} × {days} days</span>
              <span>${subtotal}</span>
            </div>
            
            {addInsurance && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insurance (${insuranceCost} × {days} days)</span>
                <span>${insuranceTotal}</span>
              </div>
            )}
            
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        )}
      </div>
      
      <Button className="mt-6 w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Book Now"}
      </Button>
    </form>
  )
}

