const express = require("express")
const { body, query, validationResult } = require("express-validator")
const Booking = require("../models/Booking")
const Car = require("../models/Car")
const User = require("../models/User")
const { authenticate, authorize } = require("../middleware/auth")

const router = express.Router()

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post(
  "/",
  authenticate,
  [
    body("carId").isMongoId().withMessage("Valid car ID is required"),
    body("startDate").isISO8601().withMessage("Valid start date is required"),
    body("endDate").isISO8601().withMessage("Valid end date is required"),
    body("pickupLocation").trim().isLength({ min: 1 }).withMessage("Pickup location is required"),
    body("dropoffLocation").trim().isLength({ min: 1 }).withMessage("Dropoff location is required"),
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

      const {
        carId,
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation,
        additionalDrivers,
        specialRequests,
        insurance,
        extras,
      } = req.body

      // Validate dates
      const start = new Date(startDate)
      const end = new Date(endDate)
      const now = new Date()

      if (start >= end) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date",
        })
      }

      if (start < now) {
        return res.status(400).json({
          success: false,
          message: "Start date cannot be in the past",
        })
      }

      // Check if car exists and is available
      const car = await Car.findById(carId)
      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        })
      }

      const isAvailable = await car.isAvailableForDates(start, end)
      if (!isAvailable) {
        return res.status(400).json({
          success: false,
          message: "Car is not available for the selected dates",
        })
      }

      // Calculate total amount
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      let totalAmount = car.pricePerDay * days

      // Add insurance cost
      if (insurance) {
        totalAmount += insurance.cost || 0
      }

      // Add extras cost
      if (extras && extras.length > 0) {
        const extrasTotal = extras.reduce((sum, extra) => sum + extra.price * extra.quantity, 0)
        totalAmount += extrasTotal
      }

      // Create booking
      const booking = new Booking({
        user: req.user._id,
        car: carId,
        startDate: start,
        endDate: end,
        pickupLocation,
        dropoffLocation,
        totalAmount,
        additionalDrivers: additionalDrivers || [],
        specialRequests,
        insurance,
        extras: extras || [],
      })

      await booking.save()
      await booking.populate([
        { path: "car", select: "make model year images pricePerDay" },
        { path: "user", select: "firstName lastName email phone" },
      ])

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: { booking },
      })
    } catch (error) {
      console.error("Create booking error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get(
  "/",
  authenticate,
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("status").optional().isIn(["pending", "confirmed", "active", "completed", "cancelled"]),
  ],
  async (req, res) => {
    try {
      const { page = 1, limit = 10, status } = req.query

      const filter = { user: req.user._id }
      if (status) filter.status = status

      const skip = (page - 1) * limit

      const [bookings, total] = await Promise.all([
        Booking.find(filter)
          .populate("car", "make model year images location")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number.parseInt(limit)),
        Booking.countDocuments(filter),
      ])

      res.json({
        success: true,
        data: {
          bookings,
          pagination: {
            current: Number.parseInt(page),
            pages: Math.ceil(total / limit),
            total,
            limit: Number.parseInt(limit),
          },
        },
      })
    } catch (error) {
      console.error("Get bookings error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get("/:id", authenticate, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("car")
      .populate("user", "firstName lastName email phone")

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    // Check if user owns the booking or is the car owner or admin
    const isOwner = booking.user._id.toString() === req.user._id.toString()
    const isCarOwner = booking.car.owner.toString() === req.user._id.toString()
    const isAdmin = req.user.role === "admin"

    if (!isOwner && !isCarOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this booking",
      })
    }

    res.json({
      success: true,
      data: { booking },
    })
  } catch (error) {
    console.error("Get booking error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private
router.put(
  "/:id/status",
  authenticate,
  [
    body("status").isIn(["pending", "confirmed", "active", "completed", "cancelled"]).withMessage("Invalid status"),
    body("cancellationReason").optional().isLength({ max: 500 }),
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

      const { status, cancellationReason } = req.body
      const booking = await Booking.findById(req.params.id).populate("car")

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        })
      }

      // Check permissions
      const isBookingOwner = booking.user.toString() === req.user._id.toString()
      const isCarOwner = booking.car.owner.toString() === req.user._id.toString()
      const isAdmin = req.user.role === "admin"

      if (!isBookingOwner && !isCarOwner && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this booking",
        })
      }

      // Update booking
      booking.status = status

      if (status === "cancelled") {
        booking.cancellationDate = new Date()
        if (cancellationReason) {
          booking.cancellationReason = cancellationReason
        }
      }

      await booking.save()

      res.json({
        success: true,
        message: "Booking status updated successfully",
        data: { booking },
      })
    } catch (error) {
      console.error("Update booking status error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/bookings/business/all
// @desc    Get all bookings for business owner's cars
// @access  Private (Business users only)
router.get(
  "/business/all",
  authenticate,
  authorize("business", "admin"),
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("status").optional().isIn(["pending", "confirmed", "active", "completed", "cancelled"]),
  ],
  async (req, res) => {
    try {
      const { page = 1, limit = 10, status } = req.query

      // Get all cars owned by the business user
      const carIds = await Car.distinct("_id", { owner: req.user._id })

      const filter = { car: { $in: carIds } }
      if (status) filter.status = status

      const skip = (page - 1) * limit

      const [bookings, total] = await Promise.all([
        Booking.find(filter)
          .populate("car", "make model year licensePlate")
          .populate("user", "firstName lastName email phone")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number.parseInt(limit)),
        Booking.countDocuments(filter),
      ])

      res.json({
        success: true,
        data: {
          bookings,
          pagination: {
            current: Number.parseInt(page),
            pages: Math.ceil(total / limit),
            total,
            limit: Number.parseInt(limit),
          },
        },
      })
    } catch (error) {
      console.error("Get business bookings error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

module.exports = router
