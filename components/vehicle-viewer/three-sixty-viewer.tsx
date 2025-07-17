"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface ThreeSixtyViewerProps {
  images: string[]
  carName: string
  className?: string
}

export function ThreeSixtyViewer({ images, carName, className }: ThreeSixtyViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleDrag(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleDrag(e.touches[0].clientX)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDrag = (clientX: number) => {
    const diff = clientX - startX
    const sensitivity = 10 // Pixels per image change

    if (Math.abs(diff) > sensitivity) {
      const imagesToMove = Math.floor(Math.abs(diff) / sensitivity)
      const direction = diff > 0 ? -1 : 1

      const newIndex = (currentIndex + direction * imagesToMove + images.length) % images.length
      setCurrentIndex(newIndex)
      setStartX(clientX)
    }
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const newIndex = Math.floor((value[0] / 100) * (images.length - 1))
    setCurrentIndex(newIndex)
  }

  // Navigate with buttons
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={cn("relative rounded-lg overflow-hidden border bg-background", className)} ref={containerRef}>
      <div
        className="relative aspect-[16/9] w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${carName} 360 view - ${currentIndex + 1} of ${images.length}`}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>

        <div className="absolute left-4 right-4 bottom-4 flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 px-2">
            <Slider
              value={[(currentIndex / (images.length - 1)) * 100]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className="z-10"
            />
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Drag to rotate the vehicle or use the slider to view from different angles
        </p>
      </div>
    </div>
  )
}

