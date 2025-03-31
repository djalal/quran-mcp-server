/**
 * Cache utility for the Quran.com API MCP Server
 * Provides a more robust caching mechanism with size limits and proper expiration
 */

/**
 * Generic cache implementation with size limits and time-based expiration
 */
export class Cache<T> {
  private cache: Map<string, { data: T, timestamp: number }> = new Map();
  private maxSize: number;
  private ttl: number;

  /**
   * Create a new cache instance
   * 
   * @param maxSize Maximum number of entries to store in the cache
   * @param ttlMs Time-to-live in milliseconds for cache entries
   */
  constructor(maxSize: number = 100, ttlMs: number = 3600000) {
    this.maxSize = maxSize;
    this.ttl = ttlMs;
  }

  /**
   * Store a value in the cache
   * 
   * @param key Cache key
   * @param data Data to store
   */
  set(key: string, data: T): void {
    // Evict oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.findOldestEntry();
      if (oldestKey) this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Retrieve a value from the cache
   * Returns null if the key doesn't exist or the entry has expired
   * 
   * @param key Cache key
   * @returns The cached data or null if not found/expired
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of entries in the cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Find the oldest entry in the cache
   * @returns The key of the oldest entry, or null if cache is empty
   */
  private findOldestEntry(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }
    
    return oldestKey;
  }
}
