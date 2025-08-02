const express = require("express")
const { body, query, validationResult } = require("express-validator")
const Car = require("../models/Car")
const Booking = require("../models/Booking")
const Review = require("../models/Review")
const { authenticate, authorize, optionalAuth } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/cars
// @desc    Get all cars with filtering and pagination
// @access  Public
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("category")
      .optional()
      .isIn(["economy", "compact", "midsize", "fullsize", "luxury", "suv", "convertible", "truck"]),
    query("minPrice").optional().isFloat({ min: 0 }),
    query("maxPrice").optional().isFloat({ min: 0 }),
    query("transmission").optional().isIn(["automatic", "manual"]),
    query("fuelType").optional().isIn(["gasoline", "diesel", "hybrid", "electric"]),
    query("location").optional().isString(),
    query("startDate").optional().isISO8601(),
    query("endDate").optional().isISO8601(),
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
        page = 1,
        limit = 12,
        category,
        minPrice,
        maxPrice,
        transmission,
        fuelType,
        location,
        startDate,
        endDate,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query

      // Build filter object
      const filter = { isAvailable: true }

      if (category) filter.category = category
      if (transmission) filter.transmission = transmission
      if (fuelType) filter.fuelType = fuelType
      if (location) filter.location = new RegExp(location, "i")

      if (minPrice || maxPrice) {
        filter.pricePerDay = {}
        if (minPrice) filter.pricePerDay.$gte = Number.parseFloat(minPrice)
        if (maxPrice) filter.pricePerDay.$lte = Number.parseFloat(maxPrice)
      }

      // If date range provided, check availability
      if (startDate && endDate) {
        const unavailableCarIds = await Booking.distinct("car", {
          status: { $in: ["confirmed", "active"] },
          $or: [
            {
              startDate: { $lte: new Date(endDate) },
              endDate: { $gte: new Date(startDate) },
            },
          ],
        })
        filter._id = { $nin: unavailableCarIds }
      }

      // Build sort object
      const sort = {}
      sort[sortBy] = sortOrder === "desc" ? -1 : 1

      const skip = (page - 1) * limit

      const [cars, total] = await Promise.all([
        Car.find(filter).populate("owner", "firstName lastName").sort(sort).skip(skip).limit(Number.parseInt(limit)),
        Car.countDocuments(filter),
      ])

      res.json({
        success: true,
        data: {
          cars,
          pagination: {
            current: Number.parseInt(page),
            pages: Math.ceil(total / limit),
            total,
            limit: Number.parseInt(limit),
          },
        },
      })
    } catch (error) {
      console.error("Get cars error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/cars/:id
// @desc    Get single car by ID
// @access  Public
router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("owner", "firstName lastName avatar")

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      })
    }

    // Get recent reviews
    const reviews = await Review.find({ car: car._id })
      .populate("user", "firstName lastName avatar")
      .sort({ createdAt: -1 })
      .limit(10)

    res.json({
      success: true,
      data: {
        car,
        reviews,
      },
    })
  } catch (error) {
    console.error("Get car error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   POST /api/cars
// @desc    Create new car listing
// @access  Private (Business users only)
router.post(
  "/",
  authenticate,
  authorize("business", "admin"),
  [
    body("make").trim().isLength({ min: 1 }).withMessage("Make is required"),
    body("model").trim().isLength({ min: 1 }).withMessage("Model is required"),
    body("year").isInt({ min: 1990, max: new Date().getFullYear() + 1 }),
    body("category").isIn(["economy", "compact", "midsize", "fullsize", "luxury", "suv", "convertible", "truck"]),
    body("transmission").isIn(["automatic", "manual"]),
    body("fuelType").isIn(["gasoline", "diesel", "hybrid", "electric"]),
    body("seats").isInt({ min: 2, max: 8 }),
    body("pricePerDay").isFloat({ min: 0 }),
    body("location").trim().isLength({ min: 1 }),
    body("mileage").isInt({ min: 0 }),
    body("licensePlate").trim().isLength({ min: 1 }),
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

      const car = new Car({
        ...req.body,
        owner: req.user._id,
      })

      await car.save()
      await car.populate("owner", "firstName lastName")

      res.status(201).json({
        success: true,
        message: "Car listing created successfully",
        data: { car },
      })
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "License plate already exists",
        })
      }

      console.error("Create car error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   PUT /api/cars/:id
// @desc    Update car listing
// @access  Private (Owner or Admin only)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      })
    }

    // Check ownership or admin role
    if (car.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this car",
      })
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("owner", "firstName lastName")

    res.json({
      success: true,
      message: "Car updated successfully",
      data: { car: updatedCar },
    })
  } catch (error) {
    console.error("Update car error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   DELETE /api/cars/:id
// @desc    Delete car listing
// @access  Private (Owner or Admin only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      })
    }

    // Check ownership or admin role
    if (car.owner.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this car",
      })
    }

    // Check for active bookings
    const activeBookings = await Booking.countDocuments({
      car: car._id,
      status: { $in: ["confirmed", "active"] },
    })

    if (activeBookings > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete car with active bookings",
      })
    }

    await Car.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: "Car deleted successfully",
    })
  } catch (error) {
    console.error("Delete car error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/cars/:id/availability
// @desc    Check car availability for date range
// @access  Public
router.get(
  "/:id/availability",
  [
    query("startDate").isISO8601().withMessage("Valid start date is required"),
    query("endDate").isISO8601().withMessage("Valid end date is required"),
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

      const { startDate, endDate } = req.query
      const car = await Car.findById(req.params.id)

      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        })
      }

      const isAvailable = await car.isAvailableForDates(new Date(startDate), new Date(endDate))

      res.json({
        success: true,
        data: {
          available: isAvailable,
          carId: car._id,
          dateRange: { startDate, endDate },
        },
      })
    } catch (error) {
      console.error("Check availability error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

module.exports = router
