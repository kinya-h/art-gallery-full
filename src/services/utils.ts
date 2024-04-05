export const formatTimestamp = (timestamp: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(timestamp).toLocaleString("en-US", options);
  return formattedDate;
};
