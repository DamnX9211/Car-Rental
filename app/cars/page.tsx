import { Suspense } from "react"
import { CarsList } from "@/components/cars-list"
import { FiltersBar } from "@/components/filters-bar"
import { Skeleton } from "@/components/ui/skeleton"

export default function CarsPage({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <div className="container py-10">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Find Your Perfect Car</h1>
        <p className="text-muted-foreground">
          Browse our extensive collection of premium vehicles and find the one that suits your needs.
        </p>
      </div>
      
      <FiltersBar />

      <Suspense fallback={<CarsListSkeleton />}>
        <CarsList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

function CarsListSkeleton() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg border p-0">
          <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex justify-between pt-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-9 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

