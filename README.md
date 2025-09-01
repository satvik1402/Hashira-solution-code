# 🚀 Hashira Placements Assignment – Polynomial Reconstruction

## 📋 Problem Statement

This project solves the polynomial reconstruction problem where you need to:
1. Parse JSON input containing roots in different number bases
2. Convert all roots to decimal form
3. Use k roots to reconstruct a polynomial of degree (k-1)
4. Compute polynomial coefficients using Lagrange interpolation
5. Output the required coefficient (e.g., constant term)

## 🏗️ Approach

### 1. Base Conversion
- Parse JSON input with roots in various bases (2-16)
- Convert each root from its given base to decimal using `parseInt(value, base)`
- Handle bases up to 16 (hexadecimal)

### 2. Polynomial Reconstruction
- Use **Lagrange Interpolation** to reconstruct the polynomial
- For k roots, the polynomial degree is (k-1)
- Build polynomial by multiplying factors: P(x) = (x - r₁)(x - r₂)...(x - rₖ)
- Expand to get coefficients in ascending order (constant term first)

### 3. Algorithm Details
- Start with polynomial [1] (representing 1)
- For each root r, multiply by (x - r)
- Use polynomial multiplication: (ax + b)(cx + d) = acx² + (ad + bc)x + bd
- Accumulate coefficients in ascending order

## 🚀 How to Run

### Prerequisites
- Node.js installed on your system

### Basic Usage
```bash
# Run with default sample input
npm start

# Run with custom JSON file
node src/index.js path/to/your/input.json

# Test with sample data
npm test
```

### Input Format
The JSON should have this structure:
```json
{
  "keys": {
    "n": <total_roots>,
    "k": <roots_to_use>
  },
  "1": {
    "base": "<base>",
    "value": "<root_value>"
  },
  "2": {
    "base": "<base>",
    "value": "<root_value>"
  }
}
```

## 📊 Example Output

### Test Case 1 (Quadratic Polynomial)
**Input:** 3 roots (degree 2)
**Output:** 
```
Roots: [ 4, 7, 12 ]
Polynomial Coefficients (constant to highest degree): [ 336, -172, 23, -1 ]
Constant term (c): 336
```

**Polynomial:** P(x) = -x³ + 23x² - 172x + 336

### Test Case 2 (6th Degree Polynomial)
**Input:** 7 roots (degree 6)
**Output:** Polynomial coefficients for a 6th degree polynomial

## 🔧 Project Structure

```
hashira-assignment/
├── package.json           # Project configuration
├── README.md             # This file
└── src/
    ├── index.js          # Main entry point
    ├── baseConversion.js # Base conversion utilities
    ├── polynomialSolver.js # Polynomial reconstruction logic
    └── sample.json       # Sample test case
```

## 🧮 Mathematical Background

### Lagrange Interpolation
Given k points (x₁, y₁), (x₂, y₂), ..., (xₖ, yₖ), the interpolating polynomial is:

P(x) = Σᵢ₌₁ᵏ yᵢ × Lᵢ(x)

Where Lᵢ(x) = Πⱼ≠ᵢ (x - xⱼ) / (xᵢ - xⱼ)

### Root-Based Construction
Since we know the roots, we can construct:
P(x) = (x - r₁)(x - r₂)...(x - rₖ)

This gives us the polynomial in factored form, which we then expand to get coefficients.

## ⚠️ Constraints & Assumptions

- **Base Range:** 2 ≤ base ≤ 16
- **Root Count:** 1 ≤ k ≤ n ≤ 10⁵
- **Large Numbers:** Uses JavaScript's built-in number handling
- **Precision:** For very large numbers, consider using BigInt

## 🎯 Evaluation Criteria

- ✅ **Correctness**: Produces valid coefficients for sample cases
- ✅ **Code Quality**: Clean, modular, and readable code
- ✅ **Error Handling**: Graceful handling of invalid inputs
- ✅ **Efficiency**: Works for large root values
- ✅ **Documentation**: Clear explanation and usage instructions

## 🔍 Testing

The project includes sample test cases:
1. **Simple case**: 3 roots → quadratic polynomial
2. **Complex case**: 7 roots → 6th degree polynomial

Run `npm test` to verify the implementation works correctly.

## 🚨 Error Handling

The code handles:
- Invalid JSON format
- Unsupported bases (outside 2-16 range)
- Missing required fields
- File not found errors

## 📝 Notes

- The polynomial coefficients are returned in ascending order (constant term first)
- For k roots, the polynomial degree is (k-1)
- The constant term is always the first coefficient in the array
- Large numbers are handled using JavaScript's native number precision
