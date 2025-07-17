import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Main pages
  const routes = [
    "",
    "/cars",
    "/about",
    "/contact",
    "/faqs",
    "/terms",
    "/privacy",
    "/help-center",
    "/business",
    "/business/learn-more",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Account pages (lower priority since they're behind auth)
  const accountRoutes = ["/account", "/account/bookings", "/account/loyalty"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  // Business pages
  const businessRoutes = [
    "/business/listings",
    "/business/add-listing",
    "/business/bookings",
    "/business/payments",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...routes, ...accountRoutes, ...businessRoutes]
}

