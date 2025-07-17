"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Star, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"

interface ReviewFormProps {
  carId: string
  carName: string
  onReviewSubmitted: (review: any) => void
}

export function ReviewForm({ carId, carName, onReviewSubmitted }: ReviewFormProps) {
  const auth = useAuth?.() || { user: null }
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    rating: false,
    title: false,
    comment: false,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // In a real app, you would upload these to a server
    // Here we're just creating object URLs for preview
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages([...images, ...newImages])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    URL.revokeObjectURL(newImages[index])
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const validateForm = () => {
    const newErrors = {
      rating: rating === 0,
      title: title.trim() === "",
      comment: comment.trim() === "",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: `review-${Date.now()}`,
        userId: auth.user?.id,
        userName: auth.user?.name,
        userImage: "/placeholder.svg?height=40&width=40", // In a real app, this would be the user's profile image
        rating,
        title,
        comment,
        date: new Date(),
        helpful: 0,
        verified: true,
        carId,
        carName,
        images,
      }

      onReviewSubmitted(newReview)

      // Reset form
      setRating(0)
      setTitle("")
      setComment("")
      setImages([])
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Write a Review for {carName}</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="rating" className="block mb-2">
            Rating <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-red-500 text-sm mt-1">Please select a rating</p>}
        </div>

        <div>
          <Label htmlFor="title" className="block mb-2">
            Review Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Please enter a title</p>}
        </div>

        <div>
          <Label htmlFor="comment" className="block mb-2">
            Your Review <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this vehicle"
            rows={5}
            className={errors.comment ? "border-red-500" : ""}
          />
          {errors.comment && <p className="text-red-500 text-sm mt-1">Please enter your review</p>}
        </div>

        <div>
          <Label htmlFor="images" className="block mb-2">
            Add Photos (optional)
          </Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative h-24 w-24 rounded-md overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="mt-2 text-xs text-muted-foreground">Upload</span>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-2">You can upload up to 5 images. Max 5MB each.</p>
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  )
}

