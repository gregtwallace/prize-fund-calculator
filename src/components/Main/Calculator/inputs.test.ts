import { describe, expect, it } from 'vitest';
import { DO_NOT_USE_testingOnlyExport as funcsForTests } from './inputs';

// minYAxisShift func
describe('minYAxisShift (from base)', () => {
  it('valid positive whole number', () => {
    const result = funcsForTests.minYAxisShift(10);
    expect(result).toBe(-0.1);
  });

  it('invalid negative whole number', () => {
    expect(() => funcsForTests.minYAxisShift(-10)).toThrow('Invalid base ');
  });

  it('valid positive float number < 1', () => {
    const result = funcsForTests.minYAxisShift(0.2);
    expect(result).toBe(-5);
  });

  it('valid positive float number > 1', () => {
    const result = funcsForTests.minYAxisShift(1.5);
    expect(result).toBeCloseTo(-0.667);
  });

  it('invalid negative float number', () => {
    expect(() => funcsForTests.minYAxisShift(-0.2)).toThrow('Invalid base ');
  });

  it('invalid 0 (divides by 0)', () => {
    expect(() => funcsForTests.minYAxisShift(0)).toThrow('Invalid base ');
  });

  it('special case 1 (should NOT return -1)', () => {
    const result = funcsForTests.minYAxisShift(1);
    expect(result).toBe(-0.999);
  });
});

// maxBase func
describe('maxBase (from funds available)', () => {
  it('valid positive whole number #1', () => {
    const result = funcsForTests.maxBase(10);
    expect(result).toBe(2150);
  });

  it('valid positive whole number #2', () => {
    const result = funcsForTests.maxBase(1050);
    expect(result).toBe(225750);
  });

  it('invalid 0', () => {
    expect(() => funcsForTests.maxBase(0)).toThrow(
      'Funds available must be greater than 0',
    );
  });

  it('invalid negative #1', () => {
    expect(() => funcsForTests.maxBase(-1)).toThrow(
      'Funds available must be greater than 0',
    );
  });

  it('invalid negative #2', () => {
    expect(() => funcsForTests.maxBase(-5089)).toThrow(
      'Funds available must be greater than 0',
    );
  });
});
