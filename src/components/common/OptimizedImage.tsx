import { useState } from 'react'
import { urlFor } from '../../lib/sanity.client'

interface OptimizedImageProps {
  image: any
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  priority?: boolean
}

const OptimizedImage = ({ 
  image, 
  alt, 
  width, 
  height, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (!image) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    )
  }

  // Generate responsive image URLs
  const baseUrl = urlFor(image).width(width).height(height)
  const src = baseUrl.url()
  
  // Generate srcset for different screen densities
  const srcSet = [
    `${urlFor(image).width(width).height(height).url()} 1x`,
    `${urlFor(image).width(width * 2).height(height * 2).url()} 2x`,
  ].join(', ')

  const webpSrcSet = [
    `${urlFor(image).width(width).height(height).format('webp').url()} 1x`,
    `${urlFor(image).width(width * 2).height(height * 2).format('webp').url()} 2x`,
  ].join(', ')

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">画像の読み込みに失敗しました</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <picture>
        <source 
          srcSet={webpSrcSet} 
          sizes={sizes}
          type="image/webp" 
        />
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ width, height }}
        />
      </picture>
    </div>
  )
}

export default OptimizedImage