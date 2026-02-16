/**
 * Rate Limiting Configuration
 *
 * Uses Upstash Redis for distributed rate limiting
 * Prevents API abuse with sliding window algorithm
 *
 * Environment Variables Required:
 * - UPSTASH_REDIS_URL: Redis instance URL
 * - UPSTASH_REDIS_TOKEN: Redis authentication token
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

/**
 * Rate Limiter Configuration
 * Sliding Window: 5 requests per 20 seconds
 * This prevents excessive API calls from single source
 */
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // Reads from environment (UPSTASH_REDIS_*)
  limiter: Ratelimit.slidingWindow(
    5, // Max 5 requests
    "20 s", // Per 20 second window
  ),
});

export default ratelimit;
