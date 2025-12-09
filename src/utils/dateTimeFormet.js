export const DateTimeFormat = (date) => {
  if (!date) return "Invalid Date"; // Return a default or fallback value
  try {
    return new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch (error) {
    console.error("Invalid date:", error); // Log invalid dates for debugging
    return "Invalid Date"; // Return fallback
  }
};
