const calc = require('../calculator');
const { spawnSync } = require('child_process');

describe('calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calc.subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calc.multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calc.divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => calc.divide(1, 0)).toThrow(/division by zero/);
  });
});

describe('calculator CLI', () => {
  test('CLI: add 2 3 => 5', () => {
    const res = spawnSync('node', ['src/calculator.js', 'add', '2', '3'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('5');
  });

  test('CLI: subtract 10 4 => 6', () => {
    const res = spawnSync('node', ['src/calculator.js', 'subtract', '10', '4'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('6');
  });

  test('CLI: multiply 45 2 => 90', () => {
    const res = spawnSync('node', ['src/calculator.js', 'multiply', '45', '2'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('90');
  });

  test('CLI: divide 20 5 => 4', () => {
    const res = spawnSync('node', ['src/calculator.js', 'divide', '20', '5'], { encoding: 'utf8' });
    expect(res.status).toBe(0);
    expect(res.stdout.trim()).toBe('4');
  });

  test('CLI: division by zero exits non-zero and prints error', () => {
    const res = spawnSync('node', ['src/calculator.js', 'divide', '1', '0'], { encoding: 'utf8' });
    expect(res.status).not.toBe(0);
    expect(res.stderr).toMatch(/division by zero/);
  });
});
