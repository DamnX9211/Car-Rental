import { Shield, Clock, CreditCard, Sparkles } from 'lucide-react'

interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
}

function Benefit({ icon, title, description }: BenefitProps) {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export function Benefits() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <Benefit
        icon={<Shield className="h-6 w-6" />}
        title="Fully Insured"
        description="All our vehicles come with comprehensive insurance coverage for your peace of mind."
      />
      <Benefit
        icon={<Clock className="h-6 w-6" />}
        title="24/7 Support"
        description="Our customer support team is available around the clock to assist you."
      />
      <Benefit
        icon={<CreditCard className="h-6 w-6" />}
        title="No Hidden Fees"
        description="Transparent pricing with no surprises. What you see is what you pay."
      />
      <Benefit
        icon={<Sparkles className="h-6 w-6" />}
        title="Premium Vehicles"
        description="Our fleet consists of well-maintained, latest model vehicles for your comfort."
      />
    </div>
  )
}

