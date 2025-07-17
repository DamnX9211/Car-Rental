"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PushNotificationManager() {
  const { toast } = useToast()
  const [permission, setPermission] = useState<NotificationPermission | "default">("default")
  const [isSupported, setIsSupported] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [notificationPreferences, setNotificationPreferences] = useState({
    bookingReminders: true,
    specialOffers: true,
    statusUpdates: true,
    accountAlerts: true,
  })

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!isSupported) return

    try {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result === "granted") {
        // Show a test notification
        const notification = new Notification("Notifications Enabled", {
          body: "You'll now receive important updates about your bookings and special offers.",
          icon: "/placeholder.svg?height=64&width=64",
        })

        toast({
          title: "Notifications enabled",
          description: "You'll now receive important updates about your bookings.",
        })
      } else if (result === "denied") {
        toast({
          title: "Notifications blocked",
          description: "Please enable notifications in your browser settings to receive updates.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      toast({
        title: "Something went wrong",
        description: "We couldn't enable notifications. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handlePreferenceChange = (key: string, value: boolean) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: value,
    })
  }

  const savePreferences = () => {
    // In a real app, you would save these preferences to the user's profile
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    })
    setShowDialog(false)
  }

  if (!isSupported) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full" disabled>
              <BellOff className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications are not supported in your browser</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (permission === "granted") {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setShowDialog(true)}>
                <Bell className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Manage notification preferences</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notification Preferences</DialogTitle>
              <DialogDescription>Choose which notifications you'd like to receive</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="booking-reminders">Booking Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders about upcoming and ongoing bookings</p>
                </div>
                <Switch
                  id="booking-reminders"
                  checked={notificationPreferences.bookingReminders}
                  onCheckedChange={(checked) => handlePreferenceChange("bookingReminders", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="special-offers">Special Offers</Label>
                  <p className="text-sm text-muted-foreground">Get notified about discounts and special promotions</p>
                </div>
                <Switch
                  id="special-offers"
                  checked={notificationPreferences.specialOffers}
                  onCheckedChange={(checked) => handlePreferenceChange("specialOffers", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status-updates">Status Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your booking status changes</p>
                </div>
                <Switch
                  id="status-updates"
                  checked={notificationPreferences.statusUpdates}
                  onCheckedChange={(checked) => handlePreferenceChange("statusUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="account-alerts">Account Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get important alerts about your account and security</p>
                </div>
                <Switch
                  id="account-alerts"
                  checked={notificationPreferences.accountAlerts}
                  onCheckedChange={(checked) => handlePreferenceChange("accountAlerts", checked)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={savePreferences}>Save Preferences</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full" onClick={requestPermission}>
            <BellOff className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enable notifications to receive updates</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

