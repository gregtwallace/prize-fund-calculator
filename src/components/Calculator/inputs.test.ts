import { describe, expect, it } from 'vitest';
import {
  inputConformation,
  DO_NOT_USE_testingOnlyExport as funcsForTests,
} from './inputs';

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

// input conformation / correction
describe('input conformation', () => {
  it('invalid NaNs', () => {
    const result = inputConformation({
      fundsAvailable: '-',
      positionsPaid: 'k',
      exponentBase: '&',
      yAxisShift: 'g',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.fundsAvailable).toBe('10000');
    expect(result.positionsPaid).toBe('22');
    expect(result.exponentBase).toBe('8.5');
    expect(result.yAxisShift).toBe('0.1');
  });

  it('invalid empty strings', () => {
    const result = inputConformation({
      fundsAvailable: '',
      positionsPaid: '',
      exponentBase: '',
      yAxisShift: '',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.fundsAvailable).toBe('10000');
    expect(result.positionsPaid).toBe('22');
    expect(result.exponentBase).toBe('8.5');
    expect(result.yAxisShift).toBe('0.1');
  });

  it('invalid value funds available', () => {
    const result = inputConformation({
      fundsAvailable: '0',
      positionsPaid: '22',
      exponentBase: '8.5',
      yAxisShift: '0.1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.fundsAvailable).toBe('100');
  });

  it('invalid value positions paid', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '0',
      exponentBase: '8.5',
      yAxisShift: '0.1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.positionsPaid).toBe('3');
  });

  it('invalid value exponent base 0', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '0',
      yAxisShift: '0.1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.exponentBase).toBe('0.1');
  });

  it('invalid value exponent base negative', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '-1',
      yAxisShift: '0.1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.exponentBase).toBe('0.1');
  });

  it('invalid value exponent base too big', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '2150001',
      yAxisShift: '0.1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.exponentBase).toBe('2150000');
  });

  it('invalid value y-axis shift #1', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '8.5',
      yAxisShift: '-5',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.yAxisShift).toBe('-0.11764705882352941');
  });

  it('invalid value y-axis shift #2', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '1',
      yAxisShift: '-1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.yAxisShift).toBe('-0.999');
  });

  it('invalid value y-axis shift #3', () => {
    const result = inputConformation({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '1.5',
      yAxisShift: '-1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result.yAxisShift).toBe('-0.6666666666666666');
  });
});
