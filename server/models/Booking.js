const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: [true, "Car is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
    },
    dropoffLocation: {
      type: String,
      required: [true, "Dropoff location is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "active", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentIntentId: {
      type: String,
      default: null,
    },
    additionalDrivers: [
      {
        name: { type: String, required: true },
        licenseNumber: { type: String, required: true },
        relationship: { type: String, required: true },
      },
    ],
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
    },
    insurance: {
      type: {
        type: String,
        enum: ["basic", "premium", "comprehensive"],
        default: "basic",
      },
      cost: { type: Number, default: 0 },
    },
    extras: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    mileageStart: {
      type: Number,
      default: null,
    },
    mileageEnd: {
      type: Number,
      default: null,
    },
    fuelLevelStart: {
      type: String,
      enum: ["empty", "quarter", "half", "three-quarters", "full"],
      default: null,
    },
    fuelLevelEnd: {
      type: String,
      enum: ["empty", "quarter", "half", "three-quarters", "full"],
      default: null,
    },
    damageReport: {
      before: [
        {
          description: String,
          severity: { type: String, enum: ["minor", "moderate", "major"] },
          images: [String],
        },
      ],
      after: [
        {
          description: String,
          severity: { type: String, enum: ["minor", "moderate", "major"] },
          images: [String],
        },
      ],
    },
    cancellationReason: {
      type: String,
      maxlength: [500, "Cancellation reason cannot exceed 500 characters"],
    },
    cancellationDate: {
      type: Date,
      default: null,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
bookingSchema.index({ user: 1 })
bookingSchema.index({ car: 1 })
bookingSchema.index({ status: 1 })
bookingSchema.index({ startDate: 1, endDate: 1 })

// Generate unique booking ID before saving
bookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    this.bookingId = `CR-${timestamp}-${random}`.toUpperCase()
  }
  next()
})

// Validate date range
bookingSchema.pre("save", function (next) {
  if (this.startDate >= this.endDate) {
    return next(new Error("End date must be after start date"))
  }
  if (this.startDate < new Date()) {
    return next(new Error("Start date cannot be in the past"))
  }
  next()
})

// Calculate duration in days
bookingSchema.virtual("durationDays").get(function () {
  const timeDiff = this.endDate - this.startDate
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
})

module.exports = mongoose.model("Booking", bookingSchema)
