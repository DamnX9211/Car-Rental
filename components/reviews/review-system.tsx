"use client"

import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { ReviewForm } from "@/components/reviews/review-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock review data - in a real app, this would come from an API
const reviewsData = [
  {
    id: "review1",
    userId: "user1",
    userName: "Sarah Johnson",
    userImage: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Excellent experience with the Tesla Model S",
    comment:
      "The car was immaculate and performed beautifully. The pickup process was smooth and the staff was very helpful. I would definitely rent this car again for my next trip to New York.",
    date: new Date(2025, 1, 15),
    helpful: 12,
    verified: true,
    carId: "car1",
    carName: "Tesla Model S",
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
  },
  {
    id: "review2",
    userId: "user2",
    userName: "Michael Chen",
    userImage: "/placeholder.svg?height=40&width=40",
    rating: 4,
    title: "Great car, minor issues with pickup",
    comment:
      "The BMW 5 Series was a pleasure to drive. Comfortable, powerful, and surprisingly fuel-efficient. The only issue was a slight delay during pickup, but the staff was apologetic and professional.",
    date: new Date(2025, 1, 10),
    helpful: 8,
    verified: true,
    carId: "car2",
    carName: "BMW 5 Series",
    images: [],
  },
  {
    id: "review3",
    userId: "user3",
    userName: "Emily Rodriguez",
    userImage: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Perfect for our family trip",
    comment:
      "We rented the Range Rover Sport for a family vacation and it was perfect. Plenty of space for our luggage, comfortable for long drives, and the kids loved the entertainment system. The car was clean and well-maintained.",
    date: new Date(2025, 0, 25),
    helpful: 15,
    verified: true,
    carId: "car4",
    carName: "Range Rover Sport",
    images: ["/placeholder.svg?height=200&width=300"],
  },
]

interface ReviewSystemProps {
  carId?: string
  carName?: string
  showForm?: boolean
}

export function ReviewSystem({ carId, carName, showForm = true }: ReviewSystemProps) {
  const { toast } = useToast()
  const auth = useAuth?.() || { user: null, showAuthModal: () => {} }
  const [reviews, setReviews] = useState(reviewsData)
  const [sortBy, setSortBy] = useState("newest")
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])
  const [helpfulClicked, setHelpfulClicked] = useState<string[]>([])
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Filter reviews by carId if provided
  const filteredReviews = carId ? reviews.filter((review) => review.carId === carId) : reviews

  // Sort reviews based on selected option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.date.getTime() - a.date.getTime()
      case "oldest":
        return a.date.getTime() - b.date.getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "most-helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  // Display limited reviews initially
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulClicked.includes(reviewId)) return

    setReviews(reviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)))

    setHelpfulClicked([...helpfulClicked, reviewId])

    toast({
      title: "Thank you for your feedback",
      description: "You marked this review as helpful",
    })
  }

  const handleReportClick = (reviewId: string) => {
    toast({
      title: "Review reported",
      description: "Thank you for helping us maintain quality reviews",
    })
  }

  const toggleExpandReview = (reviewId: string) => {
    if (expandedReviews.includes(reviewId)) {
      setExpandedReviews(expandedReviews.filter((id) => id !== reviewId))
    } else {
      setExpandedReviews([...expandedReviews, reviewId])
    }
  }

  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews])

    toast({
      title: "Review submitted",
      description: "Thank you for sharing your experience",
    })
  }

  // Calculate average rating
  const averageRating =
    filteredReviews.length > 0
      ? filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length
      : 0

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = filteredReviews.filter((review) => review.rating === rating).length
    const percentage = filteredReviews.length > 0 ? (count / filteredReviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Rating summary */}
        <div className="md:w-1/3 space-y-4">
          <div className="text-center md:text-left">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center md:justify-start mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Based on {filteredReviews.length} reviews</div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center gap-2">
                <div className="w-12 text-sm">{item.rating} stars</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <div className="w-8 text-sm text-right">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Review form */}
        {showForm && (
          <div className="md:w-2/3">
            {auth.user ? (
              <ReviewForm carId={carId} carName={carName} onReviewSubmitted={handleAddReview} />
            ) : (
              <div className="border rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Share your experience</h3>
                <p className="text-muted-foreground mb-4">Sign in to leave a review for {carName || "this vehicle"}</p>
                <Button onClick={auth.showAuthModal}>Sign In to Review</Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reviews list */}
      {filteredReviews.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {filteredReviews.length} {filteredReviews.length === 1 ? "Review" : "Reviews"}
            </h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest">Highest rated</SelectItem>
                <SelectItem value="lowest">Lowest rated</SelectItem>
                <SelectItem value="most-helpful">Most helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {displayedReviews.map((review) => {
              const isExpanded = expandedReviews.includes(review.id)
              const isLongReview = review.comment.length > 300

              return (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.userImage} alt={review.userName} />
                        <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-muted-foreground">{format(review.date, "MMM d, yyyy")}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-medium mt-3">{review.title}</h4>

                  <div className="mt-2">
                    {isLongReview && !isExpanded ? (
                      <>
                        <p className="text-muted-foreground">{review.comment.substring(0, 300)}...</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-auto p-0 text-primary"
                          onClick={() => toggleExpandReview(review.id)}
                        >
                          Read more <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-muted-foreground">{review.comment}</p>
                        {isLongReview && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-auto p-0 text-primary"
                            onClick={() => toggleExpandReview(review.id)}
                          >
                            Show less <ChevronUp className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>

                  {review.images.length > 0 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative h-24 w-32 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {!carId && (
                    <div className="mt-3 text-sm">
                      <span className="text-muted-foreground">Vehicle: </span>
                      <span className="font-medium">{review.carName}</span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-muted-foreground"
                        onClick={() => handleHelpfulClick(review.id)}
                        disabled={helpfulClicked.includes(review.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-muted-foreground"
                        onClick={() => handleReportClick(review.id)}
                      >
                        <Flag className="h-4 w-4" />
                        <span>Report</span>
                      </Button>
                    </div>

                    {review.verified && (
                      <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified Rental</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {sortedReviews.length > 3 && !showAllReviews && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setShowAllReviews(true)}>
                Show all {sortedReviews.length} reviews
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
          <p className="text-muted-foreground">Be the first to review {carName || "this vehicle"}</p>
        </div>
      )}
    </div>
  )
}

