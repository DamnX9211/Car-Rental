"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const carCategories = [
  { id: "luxury", name: "Luxury" },
  { id: "suv", name: "SUV" },
  { id: "economy", name: "Economy" },
  { id: "sport", name: "Sport" },
  { id: "electric", name: "Electric" },
]

const locations = [
  { id: "new-york", name: "New York" },
  { id: "los-angeles", name: "Los Angeles" },
  { id: "chicago", name: "Chicago" },
  { id: "miami", name: "Miami" },
  { id: "las-vegas", name: "Las Vegas" },
]

export function FiltersBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") || "50"), 
    parseInt(searchParams.get("maxPrice") || "300")
  ])
  
  const applyFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (category) {
        params.set("category", category)
      } else {
        params.delete("category")
      }
      
      if (location) {
        params.set("location", location)
      } else {
        params.delete("location")
      }
      
      params.set("minPrice", priceRange[0].toString())
      params.set("maxPrice", priceRange[1].toString())
      
      router.push(`/cars?${params.toString()}`)
    })
  }
  
  const resetFilters = () => {
    startTransition(() => {
      setCategory("")
      setLocation("")
      setPriceRange([50, 300])
      router.push("/cars")
    })
  }

  return (
    <div className="my-6 flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-1 flex-wrap gap-4 sm:flex-nowrap">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Car Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {carCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={resetFilters}
          disabled={isPending}
        >
          Reset
        </Button>
        
        <Button 
          onClick={applyFilters}
          disabled={isPending}
        >
          Apply
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <Accordion type="single" collapsible defaultValue="price">
                <AccordionItem value="price">
                  <AccordionTrigger>Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <Slider
                        value={priceRange}
                        min={50}
                        max={300}
                        step={10}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex items-center justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="transmission">
                  <AccordionTrigger>Transmission</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="automatic" />
                        <Label htmlFor="automatic">Automatic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="manual" />
                        <Label htmlFor="manual">Manual</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="seats">
                  <AccordionTrigger>Seats</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="seats-2" />
                        <Label htmlFor="seats-2">2 Seats</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="seats-4" />
                        <Label htmlFor="seats-4">4 Seats</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="seats-5" />
                        <Label htmlFor="seats-5">5 Seats</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="seats-7" />
                        <Label htmlFor="seats-7">7+ Seats</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    applyFilters()
                    document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click()
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

