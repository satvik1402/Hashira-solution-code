#!/usr/bin/env node

/**
 * Hashira Placements Assignment - Polynomial Reconstruction
 * Main entry point for the polynomial solver
 * 
 * Usage:
 *   node src/index.js                    # Uses default sample.json
 *   node src/index.js path/to/input.json # Uses custom JSON file
 */

const fs = require('fs');
const path = require('path');
const { convertToDecimal } = require('./baseConversion');
const { 
  buildPolynomial, 
  verifyRoots, 
  formatPolynomial,
  evaluatePolynomial 
} = require('./polynomialSolver');

/**
 * Main function to solve the polynomial reconstruction problem
 */
function main() {
  try {
    // Get input file path from command line or use default
    const inputFile = process.argv[2] || path.join(__dirname, 'sample.json');
    
    console.log('🚀 Hashira Placements - Polynomial Reconstruction');
    console.log('=' .repeat(50));
    console.log(`📁 Input file: ${inputFile}\n`);
    
    // Read and parse JSON input
    const jsonData = readAndParseJSON(inputFile);
    
    // Extract and validate input data
    const { n, k, roots } = extractInputData(jsonData);
    
    console.log(`📊 Input Summary:`);
    console.log(`   Total roots provided (n): ${n}`);
    console.log(`   Roots to use (k): ${k}`);
    console.log(`   Polynomial degree: ${k - 1}`);
    console.log(`   Roots used: [${roots.slice(0, k).join(', ')}]`);
    console.log('');
    
    // Build polynomial from roots
    const coefficients = buildPolynomial(roots.slice(0, k));
    
    // Verify the roots are actually roots of our polynomial
    const rootsValid = verifyRoots(coefficients, roots.slice(0, k));
    
    // Display results
    displayResults(coefficients, roots.slice(0, k), rootsValid);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Reads and parses JSON file
 * @param {string} filePath - Path to JSON file
 * @returns {Object} Parsed JSON data
 */
function readAndParseJSON(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    } else if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON format in ${filePath}: ${error.message}`);
    } else {
      throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
  }
}

/**
 * Extracts and validates input data from JSON
 * @param {Object} jsonData - Parsed JSON data
 * @returns {Object} Object containing n, k, and roots array
 */
function extractInputData(jsonData) {
  // Validate required keys
  if (!jsonData.keys || !jsonData.keys.n || !jsonData.keys.k) {
    throw new Error('Missing required "keys" object with "n" and "k" properties');
  }
  
  const { n, k } = jsonData.keys;
  
  // Validate n and k values
  if (!Number.isInteger(n) || n < 1) {
    throw new Error('Invalid value for "n": must be a positive integer');
  }
  
  if (!Number.isInteger(k) || k < 1 || k > n) {
    throw new Error(`Invalid value for "k": must be between 1 and ${n}`);
  }
  
  // Extract roots from JSON
  const roots = [];
  for (let key in jsonData) {
    if (key !== 'keys') {
      const rootData = jsonData[key];
      
      if (!rootData.base || !rootData.value) {
        throw new Error(`Invalid root data for key "${key}": missing base or value`);
      }
      
      try {
        const base = parseInt(rootData.base);
        const decimalValue = convertToDecimal(rootData.value, base);
        roots.push(decimalValue);
      } catch (error) {
        throw new Error(`Error processing root "${key}": ${error.message}`);
      }
    }
  }
  
  if (roots.length === 0) {
    throw new Error('No valid roots found in the input data');
  }
  
  if (roots.length < k) {
    throw new Error(`Insufficient roots: found ${roots.length}, need at least ${k}`);
  }
  
  return { n, k, roots };
}

/**
 * Displays the solution results
 * @param {Array} coefficients - Polynomial coefficients
 * @param {Array} roots - Roots used for reconstruction
 * @param {boolean} rootsValid - Whether roots verification passed
 */
function displayResults(coefficients, roots, rootsValid) {
  console.log('🎯 Solution Results:');
  console.log('-'.repeat(30));
  
  // Display polynomial coefficients
  console.log('📈 Polynomial Coefficients (ascending order):');
  console.log(`   [${coefficients.join(', ')}]`);
  console.log('');
  
  // Display formatted polynomial
  console.log('📝 Polynomial in Standard Form:');
  console.log(`   P(x) = ${formatPolynomial(coefficients)}`);
  console.log('');
  
  // Display key coefficients
  console.log('🔑 Key Coefficients:');
  console.log(`   Constant term (c): ${coefficients[0]}`);
  console.log(`   Leading coefficient: ${coefficients[coefficients.length - 1]}`);
  console.log(`   Degree: ${coefficients.length - 1}`);
  console.log('');
  
  // Display root verification
  console.log('✅ Root Verification:');
  if (rootsValid) {
    console.log('   All roots are valid! ✅');
  } else {
    console.log('   Some roots may have precision issues ⚠️');
  }
  console.log('');
  
  // Display polynomial evaluation at roots
  console.log('🧮 Verification (P(root) should be ≈ 0):');
  for (let root of roots) {
    const value = evaluatePolynomial(coefficients, root);
    console.log(`   P(${root}) = ${value.toFixed(10)}`);
  }
  
  console.log('\n🎉 Polynomial reconstruction completed successfully!');
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { main, extractInputData, displayResults };
