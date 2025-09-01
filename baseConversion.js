/**
 * Base conversion utilities for the Hashira assignment
 * Handles converting numbers from bases 2-16 to decimal
 */

/**
 * Converts a number string from given base to decimal
 * Works for bases up to 16 (hexadecimal)
 * @param {string} value - Number in string form (could contain a-f for bases > 10)
 * @param {number} base - The base of the number system (2-16)
 * @returns {number} Decimal equivalent
 * @throws {Error} If base is not supported or value is invalid
 */
function convertToDecimal(value, base) {
  // Validate base range
  if (base < 2 || base > 16) {
    throw new Error(`Base ${base} is not supported. Must be between 2 and 16.`);
  }
  
  // Validate input value
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error('Value must be a non-empty string.');
  }
  
  // Convert to decimal using parseInt
  const decimal = parseInt(value, base);
  
  // Check if conversion was successful
  if (isNaN(decimal)) {
    throw new Error(`Invalid value "${value}" for base ${base}.`);
  }
  
  return decimal;
}

/**
 * Validates if a string represents a valid number in the given base
 * @param {string} value - The string to validate
 * @param {number} base - The base to check against
 * @returns {boolean} True if valid, false otherwise
 */
function isValidNumber(value, base) {
  try {
    convertToDecimal(value, base);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Converts multiple roots from their respective bases to decimal
 * @param {Array} roots - Array of objects with base and value properties
 * @returns {Array} Array of decimal values
 */
function convertRootsToDecimal(roots) {
  return roots.map(root => {
    if (!root.base || !root.value) {
      throw new Error('Each root must have base and value properties.');
    }
    return convertToDecimal(root.value, parseInt(root.base));
  });
}

module.exports = { 
  convertToDecimal, 
  isValidNumber, 
  convertRootsToDecimal 
};
