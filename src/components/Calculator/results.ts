import { type inputFields } from './inputs.ts';

// funcPoint is used for raw calculations with the exponent function
interface funcPoint {
  position: number;
  xValue: number;
  yValue: number;
}

// fundPoint is used to perform scaling and rounding calculations
interface fundPoint {
  position: number;
  fundsPerecentage: number;
  fundsAbsolute: number;
  fundsAbsoluteRoundDiff: number;
  fundsAbsoluteRounded: number;
}

// dataPoint contains the results of all of the calculations
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type dataPoint = {
  position: number;
  xValue: number;
  yValue: number;
  fundsPerecentage: number;
  fundsAbsolute: number;
  fundsAbsoluteRoundDiff: number;
  fundsAbsoluteRounded: number;
};

// generateResults calculates the payout results based on the provided
// input parameters
export const generateResults = (inputVals: inputFields): dataPoint[] => {
  // get params
  const {
    fundsAvailable: fundsAvailableStr,
    positionsPaid: positionsPaidStr,
    exponentBase: exponentBaseStr,
    yAxisShift: yAxisShiftStr,
    xRangeStart: xRangeStartStr,
    xRangeEnd: xRangeEndStr,
  } = inputVals;

  // throw if non-numbers are used
  const fundsAvailable = Number.parseInt(fundsAvailableStr);
  const positionsPaid = Number.parseInt(positionsPaidStr);
  const exponentBase = Number.parseFloat(exponentBaseStr);
  const yAxisShift = Number.parseFloat(yAxisShiftStr);
  const xRangeStart = Number.parseFloat(xRangeStartStr);
  const xRangeEnd = Number.parseFloat(xRangeEndStr);
  if (
    Number.isNaN(fundsAvailable) ||
    Number.isNaN(positionsPaid) ||
    Number.isNaN(exponentBase) ||
    Number.isNaN(yAxisShift) ||
    Number.isNaN(xRangeStart) ||
    Number.isNaN(xRangeEnd)
  ) {
    throw new Error(
      'Non-numerical input value passed to result generation function',
    );
  }

  // func storage
  const funcResult: funcPoint[] = [];

  // calculate x- increment
  const xIncrement = (xRangeEnd - xRangeStart) / (positionsPaid - 1);

  // calculate each position's exponential function value
  let sumOfY = 0;

  for (let position = 1; position <= positionsPaid; position++) {
    const xValue = xRangeStart + (position - 1) * xIncrement;

    const point: funcPoint = {
      position: position,
      xValue: xValue,
      yValue: Math.pow(exponentBase, -xValue) + yAxisShift,
    };

    if (Number.isNaN(point.yValue)) {
      throw new Error('Non-numerical result (invalid curve parameters)');
    }

    sumOfY += point.yValue;

    funcResult.push(point);
  }

  // TODO: Implement Rounding Options: None, $1, $5
  const roundTo = 5;

  // scale exponential func result to total prize pool and round absolute
  let totalDifference = 0;

  const fundPoints: fundPoint[] = [];

  funcResult.map((funcPoint) => {
    const fundPercent = funcPoint.yValue / sumOfY;
    const fundAbsPreRound = fundPercent * fundsAvailable;
    const fundAbsPostRound = Math.floor(fundAbsPreRound / roundTo) * roundTo;

    const fundPt = {
      position: funcPoint.position,
      fundsPerecentage: fundPercent,
      fundsAbsolute: fundAbsPreRound,
      fundsAbsoluteRoundDiff: fundAbsPreRound - fundAbsPostRound,
      fundsAbsoluteRounded: fundAbsPostRound,
    };

    if (Number.isNaN(fundPt.fundsPerecentage)) {
      throw new Error('Non-numerical result (invalid curve parameters)');
    }

    totalDifference += fundPt.fundsAbsoluteRoundDiff;

    fundPoints.push(fundPt);
  });

  // distribute the rounded off part to the parts closest to rounding up
  fundPoints.sort(
    (a, b) => b.fundsAbsoluteRoundDiff - a.fundsAbsoluteRoundDiff,
  );

  fundPoints.map((fundPt) => {
    if (totalDifference >= roundTo) {
      fundPt.fundsAbsoluteRounded += roundTo;
      totalDifference -= roundTo;
    } else if (totalDifference > 0) {
      fundPt.fundsAbsoluteRounded += totalDifference;
      fundPt.fundsAbsoluteRounded = Math.round(fundPt.fundsAbsoluteRounded); // avoid weird decimal
      totalDifference -= totalDifference;
    }
  });

  fundPoints.sort((a, b) => a.position - b.position);

  // assemble final result with all data
  const resultData: dataPoint[] = [];

  funcResult.map((funcPoint, i) => {
    const dataPoint: dataPoint = {
      position: funcPoint.position,
      xValue: funcPoint.xValue,
      yValue: funcPoint.yValue,
      fundsPerecentage: fundPoints[i].fundsPerecentage,
      fundsAbsolute: fundPoints[i].fundsAbsolute,
      fundsAbsoluteRoundDiff: fundPoints[i].fundsAbsoluteRoundDiff,
      fundsAbsoluteRounded: fundPoints[i].fundsAbsoluteRounded,
    };

    resultData.push(dataPoint);
  });

  return resultData;
};
