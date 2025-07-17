import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground">
          Get in touch with our team for assistance with bookings, inquiries, or feedback.
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p className="text-sm text-muted-foreground">123 Drive Avenue, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex">
                  <Phone className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex">
                  <Mail className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@carrentalservice.com</p>
                  </div>
                </div>
                <div className="flex">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 8am-8pm</p>
                    <p className="text-sm text-muted-foreground">Sat-Sun: 9am-6pm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold">Branch Locations</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">New York</p>
                  <p className="text-sm text-muted-foreground">123 Drive Avenue, New York, NY 10001</p>
                </div>
                <div>
                  <p className="font-medium">Los Angeles</p>
                  <p className="text-sm text-muted-foreground">456 Cruise Blvd, Los Angeles, CA 90001</p>
                </div>
                <div>
                  <p className="font-medium">Chicago</p>
                  <p className="text-sm text-muted-foreground">789 Motor Street, Chicago, IL 60601</p>
                </div>
                <div>
                  <p className="font-medium">Miami</p>
                  <p className="text-sm text-muted-foreground">321 Beach Road, Miami, FL 33101</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

