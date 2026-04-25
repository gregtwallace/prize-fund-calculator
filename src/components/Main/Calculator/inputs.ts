// user specified configuration values for the calculator
export interface inputParams {
  positionsPaid: number;
  fundsAvailable: number;
  exponentBase: number;
  yAxisShift: number;
}

// minYAxisShift returns the minimum acceptable yAxisShift for a given base
const minYAxisShift = (base: number): number => {
  // base 0 is invalid
  if (base <= 0) throw new Error('Invalid base ' + base.toString());

  // returning -1 causes... issues, so return something slightly bigger
  if (base === 1) return -0.999;

  return -1 / base;
};

// maxBase returns the max base for a given prize fund (this isn't a hard
// mathematical limit, just sanity related)
const maxBase = (fundsAvailable: number): number => {
  if (fundsAvailable <= 0)
    throw new Error('Funds available must be greater than 0');

  return fundsAvailable * 215;
};

// inputConformation validates the input params and if one or more are not valid
// it adjusts them to valid sane values; newValueIsLower indicates if the changed
// value is lower than the previous value
export const inputConformation = (params: inputParams): inputParams => {
  //
  // positionsPaid:
  // enforce minimum of 3
  if (params.positionsPaid < 2) params.positionsPaid = 3;

  //
  // fundsAvailable:
  // enforce minimum of 100
  if (params.fundsAvailable < 100) params.fundsAvailable = 100;

  //
  // exponentBase:
  // WARNING: Do not move above `fundsAvailable` as this depends on that result
  // must be greater than 0
  if (params.exponentBase <= 0) {
    params.exponentBase = 0.1;
  }

  // enforce maximum of 215 times the prize fund
  if (params.exponentBase > maxBase(params.fundsAvailable))
    params.exponentBase = maxBase(params.fundsAvailable);

  //
  // yAxisShift:
  // WARNING: Do not move this above `exponentBase` as this depends on that result
  // enforce minimum of -1/Base
  if (params.yAxisShift < minYAxisShift(params.exponentBase))
    params.yAxisShift = minYAxisShift(params.exponentBase);

  return params;
};

export const DO_NOT_USE_testingOnlyExport = {
  minYAxisShift,
  maxBase,
};
