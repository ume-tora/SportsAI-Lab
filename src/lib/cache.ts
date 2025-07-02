// Simple in-memory cache for Sanity API responses
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttlMinutes: number = 5): void {
    const ttl = ttlMinutes * 60 * 1000 // Convert minutes to milliseconds
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }
    
    const isExpired = Date.now() - item.timestamp > item.ttl
    
    if (isExpired) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    
    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }
}

export const cache = new SimpleCache()

// Cache wrapper function for async functions
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMinutes: number = 5
): Promise<T> {
  // Check if we have cached data
  const cached = cache.get(key)
  if (cached) {
    return cached
  }

  // Fetch new data
  const data = await fetcher()
  
  // Cache the result
  cache.set(key, data, ttlMinutes)
  
  return data
}