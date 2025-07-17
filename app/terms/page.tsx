import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="container py-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: March 11, 2025</p>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            Welcome to CarRental. These Terms of Service ("Terms") govern your use of our website, mobile applications,
            and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by
            these Terms. If you do not agree to these Terms, please do not use our Services.
          </p>
          <p>
            CarRental provides a platform for users to rent vehicles for personal or business use. These Terms
            constitute a legally binding agreement between you and CarRental regarding your use of the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Eligibility</h2>
          <p>
            To use our Services, you must be at least 21 years of age and possess a valid driver's license. You must
            also meet our rental requirements, including credit card and insurance requirements as specified in our
            Rental Policy. We reserve the right to refuse service to anyone who does not meet our eligibility
            requirements.
          </p>
          <p>
            By using our Services, you represent and warrant that you meet all eligibility requirements. If you are
            using the Services on behalf of a company or organization, you represent and warrant that you have the
            authority to bind that entity to these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2>3. Account Registration</h2>
          <p>
            To access certain features of our Services, you may need to register for an account. You agree to provide
            accurate, current, and complete information during the registration process and to update such information
            to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account. We cannot and will not
            be liable for any loss or damage arising from your failure to comply with the above requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2>4. Rental Terms</h2>
          <p>
            All vehicle rentals are subject to our Rental Agreement, which you will be required to sign before taking
            possession of a vehicle. The Rental Agreement contains important terms regarding your use of the vehicle,
            including but not limited to:
          </p>
          <ul>
            <li>Authorized drivers</li>
            <li>Prohibited uses of the vehicle</li>
            <li>Fuel policies</li>
            <li>Insurance and liability</li>
            <li>Damage and loss policies</li>
            <li>Return requirements</li>
          </ul>
          <p>
            In the event of any conflict between these Terms and the Rental Agreement, the terms of the Rental Agreement
            will prevail with respect to your rental of the vehicle.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Payments and Fees</h2>
          <p>
            You agree to pay all fees and charges associated with your use of our Services, including rental fees,
            security deposits, insurance fees, fuel charges, late return fees, and any other fees specified in your
            Rental Agreement or on our website.
          </p>
          <p>
            We use third-party payment processors to process payments. By providing your payment information, you
            authorize us to charge the amount due to the payment method you provide. You represent and warrant that you
            have the legal right to use any payment method you provide.
          </p>
          <p>
            All fees are non-refundable except as expressly provided in these Terms or as required by applicable law. We
            reserve the right to change our fees at any time, upon notice to you.
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Cancellations and Modifications</h2>
          <p>
            Cancellation and modification policies vary depending on the type of reservation and rate plan. Please refer
            to your reservation confirmation for specific details regarding your booking.
          </p>
          <p>
            In general, cancellations made at least 48 hours before the scheduled pickup time are eligible for a full
            refund. Cancellations made within 48 hours of the pickup time may be subject to a cancellation fee. No-shows
            may be charged the full reservation amount.
          </p>
          <p>Modifications to reservations are subject to vehicle availability and may result in price adjustments.</p>
        </section>

        <section className="mb-8">
          <h2>7. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul>
            <li>
              Using our Services for any illegal purpose or in violation of any local, state, national, or international
              law
            </li>
            <li>
              Violating or encouraging others to violate any right of a third party, including intellectual property
              rights
            </li>
            <li>
              Interfering with, disrupting, or creating an undue burden on servers or networks connected to our Services
            </li>
            <li>Attempting to bypass any security measures of our Services</li>
            <li>Using our Services in a manner that could disable, overburden, damage, or impair the site</li>
            <li>Using any robot, spider, or other automatic device to access our Services</li>
            <li>
              Introducing any viruses, trojan horses, worms, or other material that is malicious or technologically
              harmful
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>8. Intellectual Property</h2>
          <p>
            Our Services and their entire contents, features, and functionality (including but not limited to all
            information, software, text, displays, images, video, and audio, and the design, selection, and arrangement
            thereof), are owned by CarRental, its licensors, or other providers of such material and are protected by
            copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            These Terms permit you to use our Services for your personal, non-commercial use only. You must not
            reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish,
            download, store, or transmit any of the material on our Services.
          </p>
        </section>

        <section className="mb-8">
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED. CARRENTAL DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR
            THAT OUR SERVICES OR THE SERVER THAT MAKES THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        <section className="mb-8">
          <h2>10. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL CARRENTAL, ITS AFFILIATES, OR THEIR
            LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND,
            UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, OUR SERVICES,
            INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
          </p>
        </section>

        <section className="mb-8">
          <h2>11. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless CarRental, its affiliates, licensors, and service
            providers, and its and their respective officers, directors, employees, contractors, agents, licensors,
            suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards,
            losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your
            violation of these Terms or your use of the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2>12. Governing Law and Jurisdiction</h2>
          <p>
            These Terms and your use of the Services shall be governed by and construed in accordance with the laws of
            the state of [State], without giving effect to any choice or conflict of law provision or rule. Any legal
            suit, action, or proceeding arising out of, or related to, these Terms or the Services shall be instituted
            exclusively in the federal courts of the United States or the courts of the state of [State], although we
            retain the right to bring any suit, action, or proceeding against you for breach of these Terms in your
            country of residence or any other relevant country.
          </p>
        </section>

        <section className="mb-8">
          <h2>13. Changes to Terms</h2>
          <p>
            We may revise and update these Terms from time to time in our sole discretion. All changes are effective
            immediately when we post them, and apply to all access to and use of the Services thereafter. Your continued
            use of the Services following the posting of revised Terms means that you accept and agree to the changes.
          </p>
        </section>

        <section className="mb-8">
          <h2>14. Contact Information</h2>
          <p>Questions or comments about the Services or these Terms may be directed to us at the following:</p>
          <p>
            Email: legal@carrentalservice.com
            <br />
            Phone: (555) 123-4567
            <br />
            Address: 123 Drive Avenue, New York, NY 10001
          </p>
        </section>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/privacy" className="text-primary hover:underline">
          View our Privacy Policy
        </Link>
      </div>
    </div>
  )
}

