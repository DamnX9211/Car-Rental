const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    // phone: {
    //   type: String,
    //   required: [true, "Phone number is required"],
    //   match: [/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    // },
    // dateOfBirth: {
    //   type: Date,
    //   required: [true, "Date of birth is required"],
    // },
    // licenseNumber: {
    //   type: String,
    //   required: [true, "License number is required"],
    //   unique: true,
    // },
    // address: {
    //   street: { type: String, required: true },
    //   city: { type: String, required: true },
    //   state: { type: String, required: true },
    //   zipCode: { type: String, required: true },
    //   country: { type: String, default: "USA" },
    // },
    // role: {
    //   type: String,
    //   enum: ["customer", "business", "admin"],
    //   default: "customer",
    // },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // loyaltyPoints: {
    //   type: Number,
    //   default: 0,
    // },
    // avatar: {
    //   type: String,
    //   default: null,
    // },
    // preferences: {
    //   newsletter: { type: Boolean, default: true },
    //   notifications: { type: Boolean, default: true },
    //   darkMode: { type: Boolean, default: false },
    // },
  },
  // {
  //   timestamps: true,
  // },
)

// Index for better query performance
userSchema.index({ email: 1 })
//userSchema.index({ role: 1 })

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Get full name virtual
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

module.exports = mongoose.model("User", userSchema)
