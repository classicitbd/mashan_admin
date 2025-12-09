export const DateFormat = (date) => {
  if (!date) return "Invalid Date"; // Return a default or fallback value
  try {
    return new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date(date));
  } catch (error) {
    console.error("Invalid date:", error); // Log invalid dates for debugging
    return "Invalid Date"; // Return fallback
  }
};
