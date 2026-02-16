/**
 * Utility Functions
 */

/**
 * Format a date string/object to readable format
 *
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (e.g., "Jan 15, 2026")
 */
export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
