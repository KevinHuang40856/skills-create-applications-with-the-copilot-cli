#!/usr/bin/env node
/**
 * CLI Calculator
 * Supports operations: addition, subtraction, multiplication, division
 *
 * Supported commands / symbols:
 *  - add or +       => addition
 *  - subtract or -  => subtraction
 *  - multiply or *  => multiplication (also accepts 'x')
 *  - divide or /    => division (also accepts '÷')
 *
 * Usage examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js + 4 5
 *
 * Implementation notes:
 *  - Plain Node.js, no external dependencies
 *  - Validates numeric input and handles division by zero with a clear error
 */

'use strict';

const args = process.argv.slice(2);

function usage(exitCode = 1) {
  console.log('Usage: calculator.js <operation> <num1> <num2>');
  console.log('Operations: add(+), subtract(-), multiply(*), divide(/)');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js * 4 5');
  process.exit(exitCode);
}

if (args.length !== 3) {
  usage(1);
}

const [opRaw, aRaw, bRaw] = args;
const op = String(opRaw).toLowerCase();
const a = Number(aRaw);
const b = Number(bRaw);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Error: both operands must be valid numbers');
  usage(2);
}

let result;
switch (op) {
  // Addition
  case 'add':
  case '+':
  case 'plus':
    result = a + b;
    break;

  // Subtraction
  case 'subtract':
  case '-':
  case 'minus':
    result = a - b;
    break;

  // Multiplication
  case 'multiply':
  case '*':
  case 'x':
  case '×':
    result = a * b;
    break;

  // Division
  case 'divide':
  case '/':
  case '÷':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(3);
    }
    result = a / b;
    break;

  default:
    console.error(`Unknown operation: ${opRaw}`);
    usage(4);
}

// Print the numeric result to stdout
console.log(result);

// Export functions for programmatic use (optional)
module.exports = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => {
    if (y === 0) throw new Error('division by zero');
    return x / y;
  }
};
