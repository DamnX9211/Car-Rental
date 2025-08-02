const express = require("express")
const User = require("../models/User")
const { authenticate, authorize } = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/users/stats
// @desc    Get user statistics (for admin)
// @access  Private (Admin only)
router.get("/stats", authenticate, authorize("admin"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const customerCount = await User.countDocuments({ role: "customer" })
    const businessCount = await User.countDocuments({ role: "business" })
    const verifiedCount = await User.countDocuments({ isVerified: true })

    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    res.json({
      success: true,
      data: {
        totalUsers,
        customerCount,
        businessCount,
        verifiedCount,
        recentRegistrations,
      },
    })
  } catch (error) {
    console.error("Get user stats error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
