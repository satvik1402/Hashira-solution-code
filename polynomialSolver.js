/**
 * Polynomial solver using Lagrange Interpolation
 * Given k roots, reconstructs polynomial coefficients
 * 
 * Mathematical approach:
 * P(x) = (x - r₁)(x - r₂)...(x - rₖ)
 * 
 * This gives us the polynomial in factored form,
 * which we then expand to get coefficients.
 */

/**
 * Multiplies two polynomials represented as coefficient arrays
 * @param {Array} poly1 - First polynomial coefficients [a0, a1, a2, ...]
 * @param {Array} poly2 - Second polynomial coefficients [b0, b1, b2, ...]
 * @returns {Array} Product polynomial coefficients
 */
function multiplyPolynomials(poly1, poly2) {
  const result = new Array(poly1.length + poly2.length - 1).fill(0);
  
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      result[i + j] += poly1[i] * poly2[j];
    }
  }
  
  return result;
}

/**
 * Builds polynomial from roots using factorization
 * P(x) = (x - r₁)(x - r₂)...(x - rₖ)
 * 
 * @param {Array} roots - Array of decimal root values
 * @returns {Array} Polynomial coefficients in ascending order [constant, x, x², ...]
 */
function buildPolynomial(roots) {
  if (!roots || roots.length === 0) {
    throw new Error('At least one root is required to build a polynomial.');
  }
  
  // Start with polynomial [1] (representing 1)
  let polynomial = [1];
  
  // For each root r, multiply by (x - r)
  for (let root of roots) {
    // (x - r) = -r + x, so coefficients are [-r, 1]
    const factor = [-root, 1];
    
    // Multiply current polynomial by this factor
    polynomial = multiplyPolynomials(polynomial, factor);
  }
  
  return polynomial;
}

/**
 * Evaluates polynomial at a given x value
 * @param {Array} coefficients - Polynomial coefficients [a0, a1, a2, ...]
 * @param {number} x - Value to evaluate at
 * @returns {number} P(x)
 */
function evaluatePolynomial(coefficients, x) {
  let result = 0;
  let power = 1;
  
  for (let i = 0; i < coefficients.length; i++) {
    result += coefficients[i] * power;
    power *= x;
  }
  
  return result;
}

/**
 * Verifies that the given roots are actually roots of the polynomial
 * @param {Array} coefficients - Polynomial coefficients
 * @param {Array} roots - Root values to verify
 * @returns {boolean} True if all roots are valid
 */
function verifyRoots(coefficients, roots) {
  const tolerance = 1e-10; // Small tolerance for floating point errors
  
  for (let root of roots) {
    const value = evaluatePolynomial(coefficients, root);
    if (Math.abs(value) > tolerance) {
      console.warn(`Warning: ${root} might not be an exact root. P(${root}) = ${value}`);
      return false;
    }
  }
  
  return true;
}

/**
 * Formats polynomial as a readable string
 * @param {Array} coefficients - Polynomial coefficients
 * @returns {string} Formatted polynomial string
 */
function formatPolynomial(coefficients) {
  if (coefficients.length === 0) return '0';
  if (coefficients.length === 1) return coefficients[0].toString();
  
  let terms = [];
  
  for (let i = coefficients.length - 1; i >= 0; i--) {
    const coef = coefficients[i];
    
    if (coef === 0) continue;
    
    let term = '';
    
    if (i === 0) {
      // Constant term
      term = coef.toString();
    } else if (i === 1) {
      // Linear term
      if (coef === 1) term = 'x';
      else if (coef === -1) term = '-x';
      else term = `${coef}x`;
    } else {
      // Higher degree terms
      if (coef === 1) term = `x^${i}`;
      else if (coef === -1) term = `-x^${i}`;
      else term = `${coef}x^${i}`;
    }
    
    terms.push(term);
  }
  
  return terms.join(' + ').replace(/\+ -/g, '- ');
}

module.exports = {
  buildPolynomial,
  multiplyPolynomials,
  evaluatePolynomial,
  verifyRoots,
  formatPolynomial
};
