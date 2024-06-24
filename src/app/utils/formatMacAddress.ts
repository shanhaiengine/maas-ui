/**
 * Formats a string into a valid MAC address as its being typed into an input.
 *
 * @param {String} value - original MAC address
 * @returns {String} formatted MAC address
 */

// export const formatMacAddress = (value: string): string => {
//   const hexValues = value.replace(/:/g, "");
//   if (value.length % 3 === 0) {
//     return hexValues.replace(/([0-9A-Za-z]{2})/g, "$1:").substring(0, 17);
//   }
//   return value.substring(0, 17);
// };

export const formatMacAddress = (value: string): string => {
  const hexValues = value.replace(/:/g, "");

  // Check if it's a standard MAC address (6 bytes) or an IPoIB MAC address (20 bytes)
  if (hexValues.length === 12) {
    // Standard MAC address
    return hexValues
      .replace(/([0-9A-Fa-f]{2})(?=(?:[0-9A-Fa-f]{2})+(?!$))/g, "$1:")
      .substring(0, 17);
  } else if (hexValues.length === 40) {
    // IPoIB MAC address
    return hexValues
      .replace(/([0-9A-Fa-f]{2})(?=(?:[0-9A-Fa-f]{2})+(?!$))/g, "$1:")
      .substring(0, 59);
  }
  // If not matching the lengths, return standard MAC address
  return value.substring(0, 17);
};
