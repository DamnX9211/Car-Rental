"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string
}

export function ImageWithFallback({ src, fallbackSrc = "/placeholder.svg", alt, ...rest }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse">
          <span className="sr-only">Loading image...</span>
        </div>
      )}
      <Image
        {...rest}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
        }}
      />
    </div>
  )
}

