const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
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
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    aspects: {
      cleanliness: { type: Number, min: 1, max: 5 },
      comfort: { type: Number, min: 1, max: 5 },
      performance: { type: Number, min: 1, max: 5 },
      value: { type: Number, min: 1, max: 5 },
    },
    images: [
      {
        url: { type: String, required: true },
        caption: { type: String, maxlength: 200 },
      },
    ],
    helpful: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
      },
    ],
    response: {
      text: { type: String, maxlength: 500 },
      date: { type: Date },
      responder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
reviewSchema.index({ car: 1, rating: -1 })
reviewSchema.index({ user: 1 })
reviewSchema.index({ createdAt: -1 })

// Ensure one review per booking
reviewSchema.index({ booking: 1 }, { unique: true })

// Virtual for helpful count
reviewSchema.virtual("helpfulCount").get(function () {
  return this.helpful.length
})

module.exports = mongoose.model("Review", reviewSchema)
