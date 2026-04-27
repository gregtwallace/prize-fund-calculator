// user specified configuration values for the calculator
export interface inputFields {
  fundsAvailable: string;
  positionsPaid: string;
  exponentBase: string;
  yAxisShift: string;

  xRangeStart: string;
  xRangeEnd: string;
}

// default values
export const inputParamsDefault: inputFields = {
  fundsAvailable: '10000',
  positionsPaid: '22',
  exponentBase: '8.5',
  yAxisShift: '0.1',

  // static, for now
  xRangeStart: '0',
  xRangeEnd: '1',
};

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
export const inputConformation = (params: inputFields): inputFields => {
  //
  // fundsAvailable:
  let fundsAvailableVal = Number.parseInt(params.fundsAvailable);

  // if NaN, use a default
  if (Number.isNaN(fundsAvailableVal))
    fundsAvailableVal = Number.parseInt(inputParamsDefault.fundsAvailable);

  // enforce minimum of 100
  if (fundsAvailableVal < 100) fundsAvailableVal = 100;

  //
  // positionsPaid:
  let positionsPaidVal = Number.parseInt(params.positionsPaid);

  // if NaN, use a default
  if (Number.isNaN(positionsPaidVal))
    positionsPaidVal = Number.parseInt(inputParamsDefault.positionsPaid);

  // enforce minimum of 3
  if (positionsPaidVal < 3) positionsPaidVal = 3;

  //
  // exponentBase:
  // WARNING: Do not move above `fundsAvailable` as this depends on that result
  // must be greater than 0
  let exponentBaseVal = Number.parseFloat(params.exponentBase);

  // if NaN, use a default
  if (Number.isNaN(exponentBaseVal))
    exponentBaseVal = Number.parseFloat(inputParamsDefault.exponentBase);

  if (exponentBaseVal <= 0) {
    exponentBaseVal = 0.1;
  }

  // enforce maximum of 215 times the prize fund
  if (exponentBaseVal > maxBase(fundsAvailableVal))
    exponentBaseVal = maxBase(fundsAvailableVal);

  //
  // yAxisShift:
  // WARNING: Do not move this above `exponentBase` as this depends on that result
  let yAxisShiftVal = Number.parseFloat(params.yAxisShift);

  // if NaN, use a default
  if (Number.isNaN(yAxisShiftVal))
    yAxisShiftVal = Number.parseFloat(inputParamsDefault.yAxisShift);

  // enforce minimum of -1/Base
  if (yAxisShiftVal < minYAxisShift(exponentBaseVal))
    yAxisShiftVal = minYAxisShift(exponentBaseVal);

  return {
    fundsAvailable: fundsAvailableVal.toString(),
    positionsPaid: positionsPaidVal.toString(),
    exponentBase: exponentBaseVal.toString(),
    yAxisShift: yAxisShiftVal.toString(),

    xRangeStart: inputParamsDefault.xRangeStart,
    xRangeEnd: inputParamsDefault.xRangeEnd,
  };
};

export const DO_NOT_USE_testingOnlyExport = {
  minYAxisShift,
  maxBase,
};
