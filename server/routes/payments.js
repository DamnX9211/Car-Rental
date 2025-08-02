const express = require("express")
const { body, validationResult } = require("express-validator")
const Booking = require("../models/Booking")
const User = require("../models/User")
const { authenticate } = require("../middleware/auth")

const router = express.Router()

// Mock Stripe-like payment processing
// In production, you would use actual Stripe SDK

// @route   POST /api/payments/create-intent
// @desc    Create payment intent for booking
// @access  Private
router.post(
  "/create-intent",
  authenticate,
  [body("bookingId").isMongoId().withMessage("Valid booking ID is required")],
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

      const { bookingId } = req.body

      const booking = await Booking.findById(bookingId).populate("car")
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        })
      }

      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        })
      }

      // Mock payment intent creation
      const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Update booking with payment intent
      booking.paymentIntentId = paymentIntentId
      await booking.save()

      res.json({
        success: true,
        data: {
          clientSecret: `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 9)}`,
          paymentIntentId,
          amount: booking.totalAmount * 100, // Convert to cents
          currency: "usd",
        },
      })
    } catch (error) {
      console.error("Create payment intent error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   POST /api/payments/confirm
// @desc    Confirm payment and update booking
// @access  Private
router.post(
  "/confirm",
  authenticate,
  [
    body("paymentIntentId").isString().withMessage("Payment intent ID is required"),
    body("bookingId").isMongoId().withMessage("Valid booking ID is required"),
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

      const { paymentIntentId, bookingId } = req.body

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
          message: "Not authorized",
        })
      }

      // Mock payment confirmation (in production, verify with Stripe)
      if (booking.paymentIntentId !== paymentIntentId) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment intent",
        })
      }

      // Update booking status
      booking.paymentStatus = "paid"
      booking.status = "confirmed"
      await booking.save()

      // Award loyalty points to user
      const user = await User.findById(req.user._id)
      const pointsEarned = Math.floor(booking.totalAmount * 0.1) // 10% of amount in points
      user.loyaltyPoints += pointsEarned
      await user.save()

      res.json({
        success: true,
        message: "Payment confirmed successfully",
        data: {
          booking,
          pointsEarned,
        },
      })
    } catch (error) {
      console.error("Confirm payment error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

module.exports = router
