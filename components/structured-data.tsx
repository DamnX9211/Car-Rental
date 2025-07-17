import { siteConfig } from "@/config/site"

interface StructuredDataProps {
  type: "website" | "organization" | "breadcrumb" | "product" | "faq" | "article"
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {}

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/cars?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }
      break

    case "organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: siteConfig.url,
        name: siteConfig.name,
        logo: `${siteConfig.url}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.contactPhone,
          contactType: "customer service",
          email: siteConfig.contactEmail,
          availableLanguage: "English",
        },
        sameAs: [siteConfig.links.twitter, siteConfig.links.facebook, siteConfig.links.instagram],
      }
      break

    case "breadcrumb":
      if (!data || !data.items) break
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.url}${item.path}`,
        })),
      }
      break

    case "product":
      if (!data) break
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data.name,
        description: data.description,
        image: data.image,
        offers: {
          "@type": "Offer",
          price: data.pricePerDay,
          priceCurrency: "USD",
          availability: data.availability ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          priceValidUntil:
            data.priceValidUntil ||
            new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: data.rating,
          reviewCount: data.reviewCount,
        },
      }
      break

    case "faq":
      if (!data || !data.questions) break
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.questions.map((item: any) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
      break

    case "article":
      if (!data) break
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        image: data.image,
        author: {
          "@type": "Person",
          name: data.author,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/logo.png`,
          },
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
      }
      break
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

