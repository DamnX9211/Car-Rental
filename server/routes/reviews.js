const express = require("express")
const { body, validationResult } = require("express-validator")
const Review = require("../models/Review")
const Booking = require("../models/Booking")
const Car = require("../models/Car")
const { authenticate } = require("../middleware/auth")

const router = express.Router()

// @route   POST /api/reviews
// @desc    Create new review
// @access  Private
router.post(
  "/",
  authenticate,
  [
    body("bookingId").isMongoId().withMessage("Valid booking ID is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("title")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Title is required and must not exceed 100 characters"),
    body("comment")
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Comment is required and must not exceed 1000 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { bookingId, rating, title, comment, aspects, images } = req.body

      // Check if booking exists and belongs to user
      const booking = await Booking.findById(bookingId)
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        })
      }

      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to review this booking",
        })
      }

      if (booking.status !== "completed") {
        return res.status(400).json({
          success: false,
          message: "Can only review completed bookings",
        })
      }

      // Check if review already exists for this booking
      const existingReview = await Review.findOne({ booking: bookingId })
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "Review already exists for this booking",
        })
      }

      // Create review
      const review = new Review({
        user: req.user._id,
        car: booking.car,
        booking: bookingId,
        rating,
        title,
        comment,
        aspects,
        images: images || [],
      })

      await review.save()
      await review.populate([
        { path: "user", select: "firstName lastName avatar" },
        { path: "car", select: "make model year" },
      ])

      // Update car rating
      const allReviews = await Review.find({ car: booking.car })
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

      await Car.findByIdAndUpdate(booking.car, {
        "rating.average": avgRating,
        "rating.count": allReviews.length,
      })

      res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: { review },
      })
    } catch (error) {
      console.error("Create review error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/reviews/car/:carId
// @desc    Get reviews for a car
// @access  Public
router.get("/car/:carId", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit

    const [reviews, total] = await Promise.all([
      Review.find({ car: req.params.carId })
        .populate("user", "firstName lastName avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number.parseInt(limit)),
      Review.countDocuments({ car: req.params.carId }),
    ])

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current: Number.parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: Number.parseInt(limit),
        },
      },
    })
  } catch (error) {
    console.error("Get car reviews error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
