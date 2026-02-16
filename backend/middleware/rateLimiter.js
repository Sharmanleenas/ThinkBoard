/**
 * Rate Limiter Middleware
 *
 * Applies rate limiting to all API requests
 * Returns 429 (Too Many Requests) when limit exceeded
 * Helps prevent API abuse and DDoS attacks
 */

import ratelimit from "../config/upstash.js";

/**
 * Rate Limiter Middleware Function
 * Checks if request exceeds rate limit quota
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const ratelimiter = async (req, res, next) => {
  try {
    // Check rate limit using fixed key (applies limit globally, not per IP)
    // For production, use: req.ip or req.headers['x-forwarded-for']
    const { success } = await ratelimit.limit("my-limiter-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next(); // Allow request to proceed
  } catch (error) {
    console.error("⚠️ Rate limiter error:", error);
    // On error, allow request to proceed (fail open)
    next();
  }
};

export default ratelimiter;
