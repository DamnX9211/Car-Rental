"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Award, Car, Clock, Shield, CreditCard, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/components/auth-provider"

// Mock loyalty data - in a real app, this would come from an API
const loyaltyTiers = [
  {
    name: "Bronze",
    pointsRequired: 0,
    color: "bg-amber-700",
    benefits: ["Standard booking options", "Email support", "1 point per $1 spent"],
  },
  {
    name: "Silver",
    pointsRequired: 1000,
    color: "bg-gray-400",
    benefits: [
      "Free upgrades when available",
      "Priority email support",
      "1.5 points per $1 spent",
      "10% weekend discount",
    ],
  },
  {
    name: "Gold",
    pointsRequired: 5000,
    color: "bg-amber-500",
    benefits: [
      "Guaranteed upgrades",
      "Priority phone support",
      "2 points per $1 spent",
      "15% weekend discount",
      "Free additional driver",
    ],
  },
  {
    name: "Platinum",
    pointsRequired: 10000,
    color: "bg-slate-800",
    benefits: [
      "Guaranteed upgrades",
      "Dedicated concierge",
      "3 points per $1 spent",
      "20% discount anytime",
      "Free additional driver",
      "Airport fast-track service",
    ],
  },
]

// Mock rewards data
const availableRewards = [
  {
    id: "reward1",
    name: "Free Day Rental",
    description: "Get a free day on your next rental",
    pointsCost: 500,
    icon: <Car className="h-8 w-8" />,
  },
  {
    id: "reward2",
    name: "Airport Lounge Access",
    description: "One-time airport lounge access",
    pointsCost: 750,
    icon: <Clock className="h-8 w-8" />,
  },
  {
    id: "reward3",
    name: "Premium Insurance",
    description: "Free premium insurance on your next rental",
    pointsCost: 300,
    icon: <Shield className="h-8 w-8" />,
  },
  {
    id: "reward4",
    name: "$50 Rental Credit",
    description: "Get $50 off your next rental",
    pointsCost: 450,
    icon: <CreditCard className="h-8 w-8" />,
  },
]

export function LoyaltyProgram() {
  const auth = useAuth?.() || { user: null }
  const [userPoints, setUserPoints] = useState(1250) // Mock user points
  const [currentTier, setCurrentTier] = useState(loyaltyTiers[0])
  const [nextTier, setNextTier] = useState(loyaltyTiers[1])
  const [pointsToNextTier, setPointsToNextTier] = useState(0)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [redeemingReward, setRedeemingReward] = useState<string | null>(null)

  useEffect(() => {
    // Determine current tier based on points
    const tier = [...loyaltyTiers].reverse().find((tier) => userPoints >= tier.pointsRequired)
    if (tier) {
      setCurrentTier(tier)

      // Find next tier
      const currentTierIndex = loyaltyTiers.findIndex((t) => t.name === tier.name)
      if (currentTierIndex < loyaltyTiers.length - 1) {
        const next = loyaltyTiers[currentTierIndex + 1]
        setNextTier(next)

        // Calculate points needed for next tier
        const pointsNeeded = next.pointsRequired - userPoints
        setPointsToNextTier(pointsNeeded)

        // Calculate progress percentage
        const tierRange = next.pointsRequired - tier.pointsRequired
        const userProgress = userPoints - tier.pointsRequired
        const percentage = (userProgress / tierRange) * 100
        setProgressPercentage(percentage)
      } else {
        // User is at highest tier
        setNextTier(null)
        setPointsToNextTier(0)
        setProgressPercentage(100)
      }
    }
  }, [userPoints])

  const handleRedeemReward = (rewardId: string, pointsCost: number) => {
    setRedeemingReward(rewardId)

    // Simulate API call
    setTimeout(() => {
      setUserPoints((prev) => prev - pointsCost)
      setRedeemingReward(null)
    }, 1500)
  }

  if (!auth.user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Program</CardTitle>
          <CardDescription>Sign in to view your loyalty status and rewards</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Award className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground mb-4">
            Join our loyalty program to earn points with every rental and unlock exclusive benefits
          </p>
          <Button onClick={() => auth.showAuthModal?.()}>Sign In</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Loyalty Status</CardTitle>
              <CardDescription>Earn points with every rental to unlock exclusive benefits</CardDescription>
            </div>
            <div className={`${currentTier.color} text-white px-4 py-2 rounded-full text-sm font-medium`}>
              {currentTier.name}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium">{userPoints} points</span>
            {nextTier && (
              <span className="text-sm text-muted-foreground">
                {pointsToNextTier} points to {nextTier.name}
              </span>
            )}
          </div>

          <Progress value={progressPercentage} className="h-2" />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                Current Benefits
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Benefits for your current tier level</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h4>
              <ul className="space-y-1">
                {currentTier.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm flex items-center"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            {nextTier && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  Next Tier Benefits
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unlock these benefits when you reach {nextTier.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h4>
                <ul className="space-y-1">
                  {nextTier.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/account/loyalty-history">View Points History</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/loyalty-program">Program Details</Link>
          </Button>
        </CardFooter>
      </Card>

      <div>
        <h3 className="text-xl font-bold mb-4">Available Rewards</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {availableRewards.map((reward) => (
            <Card key={reward.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{reward.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {reward.icon}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{reward.description}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <span className="font-medium">{reward.pointsCost} points</span>
                <Button
                  size="sm"
                  disabled={userPoints < reward.pointsCost || redeemingReward === reward.id}
                  onClick={() => handleRedeemReward(reward.id, reward.pointsCost)}
                >
                  {redeemingReward === reward.id ? "Redeeming..." : "Redeem"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

