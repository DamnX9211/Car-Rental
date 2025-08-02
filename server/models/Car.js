const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Car make is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Car model is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1990, "Year must be 1990 or later"],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["economy", "compact", "midsize", "fullsize", "luxury", "suv", "convertible", "truck"],
    },
    transmission: {
      type: String,
      required: [true, "Transmission type is required"],
      enum: ["automatic", "manual"],
    },
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: ["gasoline", "diesel", "hybrid", "electric"],
    },
    seats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: [2, "Must have at least 2 seats"],
      max: [8, "Cannot have more than 8 seats"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: [0, "Price cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    features: [
      {
        type: String,
        enum: [
          "air_conditioning",
          "bluetooth",
          "gps",
          "backup_camera",
          "heated_seats",
          "sunroof",
          "usb_ports",
          "wifi",
          "child_seat",
          "ski_rack",
        ],
      },
    ],
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required"],
      min: [0, "Mileage cannot be negative"],
    },
    licensePlate: {
      type: String,
      required: [true, "License plate is required"],
      unique: true,
    },
    insurance: {
      provider: { type: String, required: true },
      policyNumber: { type: String, required: true },
      expiryDate: { type: Date, required: true },
    },
    maintenance: {
      lastService: { type: Date, required: true },
      nextService: { type: Date, required: true },
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    bookingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
carSchema.index({ category: 1, location: 1 })
carSchema.index({ pricePerDay: 1 })
carSchema.index({ owner: 1 })
carSchema.index({ isAvailable: 1 })
carSchema.index({ "rating.average": -1 })

// Virtual for car display name
carSchema.virtual("displayName").get(function () {
  return `${this.year} ${this.make} ${this.model}`
})

// Method to check availability for date range
carSchema.methods.isAvailableForDates = async function (startDate, endDate) {
  const Booking = mongoose.model("Booking")
  const conflictingBooking = await Booking.findOne({
    car: this._id,
    status: { $in: ["confirmed", "active"] },
    $or: [
      {
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      },
    ],
  })

  return !conflictingBooking && this.isAvailable
}

module.exports = mongoose.model("Car", carSchema)
