/**
 * Rate Limited UI Component
 *
 * Purpose: Display message when user hits rate limit (429 response)
 * Shows when too many API requests made in short time period
 */

const RateLimitedUI = () => {
  return (
    <div className="alert alert-error max-w-2xl mx-auto mt-6">
      <span>⚠️ Too many requests. Please try again later.</span>
    </div>
  );
};

export default RateLimitedUI;
