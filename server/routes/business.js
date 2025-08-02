const express = require("express")
const Car = require("../models/Car")
const Booking = require("../models/Booking")
const Review = require("../models/Review")
const { authenticate, authorize } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/business/dashboard
// @desc    Get business dashboard statistics
// @access  Private (Business users only)
router.get("/dashboard", authenticate, authorize("business", "admin"), async (req, res) => {
  try {
    // Get all cars owned by the business
    const cars = await Car.find({ owner: req.user._id })
    const carIds = cars.map((car) => car._id)

    // Calculate statistics
    const totalCars = cars.length
    const availableCars = cars.filter((car) => car.isAvailable).length

    // Get bookings for this business's cars
    const allBookings = await Booking.find({ car: { $in: carIds } })
    const totalBookings = allBookings.length
    const activeBookings = allBookings.filter(
      (booking) => booking.status === "active" || booking.status === "confirmed",
    ).length

    // Calculate total revenue
    const completedBookings = allBookings.filter((booking) => booking.status === "completed")
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

    // Monthly revenue (last 12 months)
    const monthlyRevenue = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      const monthBookings = completedBookings.filter(
        (booking) => booking.createdAt >= monthStart && booking.createdAt <= monthEnd,
      )

      monthlyRevenue.push({
        month: date.toLocaleString("default", { month: "short", year: "numeric" }),
        revenue: monthBookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
        bookings: monthBookings.length,
      })
    }

    // Get recent bookings
    const recentBookings = await Booking.find({ car: { $in: carIds } })
      .populate("user", "firstName lastName")
      .populate("car", "make model year")
      .sort({ createdAt: -1 })
      .limit(5)

    // Get reviews for business cars
    const reviews = await Review.find({ car: { $in: carIds } })
      .populate("user", "firstName lastName avatar")
      .populate("car", "make model year")
      .sort({ createdAt: -1 })
      .limit(10)

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    res.json({
      success: true,
      data: {
        totalCars,
        availableCars,
        totalBookings,
        activeBookings,
        totalRevenue,
        averageRating,
        monthlyRevenue,
        recentBookings,
        recentReviews: reviews,
      },
    })
  } catch (error) {
    console.error("Get business dashboard error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
