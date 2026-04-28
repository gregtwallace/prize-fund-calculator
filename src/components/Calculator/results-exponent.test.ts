import { describe, expect, it } from 'vitest';
import { generateResults } from './results-exponent';

describe('calculator result generation (error: input non-numbers)', () => {
  it('invalid NaN #1', () => {
    expect(() =>
      generateResults({
        fundsAvailable: 'a',
        positionsPaid: '22',
        exponentBase: '8.5',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid NaN #2', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '10000',
        positionsPaid: 'b',
        exponentBase: '8.5',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid NaN #3', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '10000',
        positionsPaid: '22',
        exponentBase: '-',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid NaN #4', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '10000',
        positionsPaid: '22',
        exponentBase: '8.5',
        yAxisShift: '%',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid empty string #1', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '',
        positionsPaid: '22',
        exponentBase: '8.5',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid empty string #2', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '10000',
        positionsPaid: '',
        exponentBase: '8.5',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid empty string #3', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '10000',
        positionsPaid: '22',
        exponentBase: '',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });

  it('invalid empty string #4', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '10000',
        positionsPaid: '22',
        exponentBase: '8.5',
        yAxisShift: '',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical input');
  });
});

describe('calculator result generation (error: calculations yield NaN)', () => {
  it('invalid non-existent curve range #1', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '1000',
        positionsPaid: '22',
        exponentBase: '-8.5',
        yAxisShift: '0.1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical result');
  });

  it('invalid non-existent curve range #2', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '1000',
        positionsPaid: '22',
        exponentBase: '1',
        yAxisShift: '-1',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical result');
  });

  it('invalid non-existent curve range #3', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '1000',
        positionsPaid: '22',
        exponentBase: '0',
        yAxisShift: '2',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical result');
  });

  it('invalid non-existent curve range #4', () => {
    expect(() =>
      generateResults({
        fundsAvailable: '1000',
        positionsPaid: '22',
        exponentBase: '-2',
        yAxisShift: '20',

        xRangeStart: '0',
        xRangeEnd: '1',
      }),
    ).toThrow('Non-numerical result');
  });
});

describe('calculator result generation (value results)', () => {
  it('Real value #1', () => {
    const result = generateResults({
      fundsAvailable: '10000',
      positionsPaid: '22',
      exponentBase: '8.5',
      yAxisShift: '0.1',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result).toStrictEqual([
      {
        fundsAbsolute: 962.83,
        fundsAbsoluteRoundDiff: 2.83,
        fundsAbsoluteRounded: 965,
        fundsPerecentage: 0.0963,
        position: 1,
        xValue: 0,
        yValue: 1.1,
      },
      {
        fundsAbsolute: 878.02,
        fundsAbsoluteRoundDiff: 3.02,
        fundsAbsoluteRounded: 880,
        fundsPerecentage: 0.0878,
        position: 2,
        xValue: 0.047619047619047616,
        yValue: 1.0031127131888826,
      },
      {
        fundsAbsolute: 801.44,
        fundsAbsoluteRoundDiff: 1.44,
        fundsAbsoluteRounded: 800,
        fundsPerecentage: 0.0801,
        position: 3,
        xValue: 0.09523809523809523,
        yValue: 0.9156125727233849,
      },
      {
        fundsAbsolute: 732.27,
        fundsAbsoluteRoundDiff: 2.27,
        fundsAbsoluteRounded: 730,
        fundsPerecentage: 0.0732,
        position: 4,
        xValue: 0.14285714285714285,
        yValue: 0.8365900834631809,
      },
      {
        fundsAbsolute: 669.8,
        fundsAbsoluteRoundDiff: 4.8,
        fundsAbsoluteRounded: 670,
        fundsPerecentage: 0.067,
        position: 5,
        xValue: 0.19047619047619047,
        yValue: 0.7652238687844588,
      },
      {
        fundsAbsolute: 613.39,
        fundsAbsoluteRoundDiff: 3.39,
        fundsAbsoluteRounded: 615,
        fundsPerecentage: 0.0613,
        position: 6,
        xValue: 0.23809523809523808,
        yValue: 0.7007721330159378,
      },
      {
        fundsAbsolute: 562.44,
        fundsAbsoluteRoundDiff: 2.44,
        fundsAbsoluteRounded: 565,
        fundsPerecentage: 0.0562,
        position: 7,
        xValue: 0.2857142857142857,
        yValue: 0.6425649510562959,
      },
      {
        fundsAbsolute: 516.42,
        fundsAbsoluteRoundDiff: 1.42,
        fundsAbsoluteRounded: 515,
        fundsPerecentage: 0.0516,
        position: 8,
        xValue: 0.3333333333333333,
        yValue: 0.5899973050296446,
      },
      {
        fundsAbsolute: 474.87,
        fundsAbsoluteRoundDiff: 4.87,
        fundsAbsoluteRounded: 475,
        fundsPerecentage: 0.0475,
        position: 9,
        xValue: 0.38095238095238093,
        yValue: 0.5425227956005628,
      },
      {
        fundsAbsolute: 437.34,
        fundsAbsoluteRoundDiff: 2.34,
        fundsAbsoluteRounded: 435,
        fundsPerecentage: 0.0437,
        position: 10,
        xValue: 0.42857142857142855,
        yValue: 0.4996479625827537,
      },
      {
        fundsAbsolute: 403.45,
        fundsAbsoluteRoundDiff: 3.45,
        fundsAbsoluteRounded: 405,
        fundsPerecentage: 0.0403,
        position: 11,
        xValue: 0.47619047619047616,
        yValue: 0.4609271558085196,
      },
      {
        fundsAbsolute: 372.84,
        fundsAbsoluteRoundDiff: 2.84,
        fundsAbsoluteRounded: 375,
        fundsPerecentage: 0.0373,
        position: 12,
        xValue: 0.5238095238095237,
        yValue: 0.42595790294577884,
      },
      {
        fundsAbsolute: 345.2,
        fundsAbsoluteRoundDiff: 0.2,
        fundsAbsoluteRounded: 345,
        fundsPerecentage: 0.0345,
        position: 13,
        xValue: 0.5714285714285714,
        yValue: 0.39437672611472074,
      },
      {
        fundsAbsolute: 320.23,
        fundsAbsoluteRoundDiff: 0.23,
        fundsAbsoluteRounded: 320,
        fundsPerecentage: 0.032,
        position: 14,
        xValue: 0.6190476190476191,
        yValue: 0.36585536382112593,
      },
      {
        fundsAbsolute: 297.69,
        fundsAbsoluteRoundDiff: 2.69,
        fundsAbsoluteRounded: 300,
        fundsPerecentage: 0.0298,
        position: 15,
        xValue: 0.6666666666666666,
        yValue: 0.34009735893631465,
      },
      {
        fundsAbsolute: 277.33,
        fundsAbsoluteRoundDiff: 2.33,
        fundsAbsoluteRounded: 275,
        fundsPerecentage: 0.0277,
        position: 16,
        xValue: 0.7142857142857142,
        yValue: 0.3168349772584601,
      },
      {
        fundsAbsolute: 258.94,
        fundsAbsoluteRoundDiff: 3.94,
        fundsAbsoluteRounded: 260,
        fundsPerecentage: 0.0259,
        position: 17,
        xValue: 0.7619047619047619,
        yValue: 0.29582642462613756,
      },
      {
        fundsAbsolute: 242.33,
        fundsAbsoluteRoundDiff: 2.33,
        fundsAbsoluteRounded: 240,
        fundsPerecentage: 0.0242,
        position: 18,
        xValue: 0.8095238095238095,
        yValue: 0.2768533336581893,
      },
      {
        fundsAbsolute: 227.33,
        fundsAbsoluteRoundDiff: 2.33,
        fundsAbsoluteRounded: 225,
        fundsPerecentage: 0.0227,
        position: 19,
        xValue: 0.8571428571428571,
        yValue: 0.25971849399654606,
      },
      {
        fundsAbsolute: 213.79,
        fundsAbsoluteRoundDiff: 3.79,
        fundsAbsoluteRounded: 215,
        fundsPerecentage: 0.0214,
        position: 20,
        xValue: 0.9047619047619047,
        yValue: 0.24424380245966298,
      },
      {
        fundsAbsolute: 201.55,
        fundsAbsoluteRoundDiff: 1.55,
        fundsAbsoluteRounded: 200,
        fundsPerecentage: 0.0202,
        position: 21,
        xValue: 0.9523809523809523,
        yValue: 0.23026841180002744,
      },
      {
        fundsAbsolute: 190.51,
        fundsAbsoluteRoundDiff: 0.51,
        fundsAbsoluteRounded: 190,
        fundsPerecentage: 0.0191,
        position: 22,
        xValue: 1,
        yValue: 0.21764705882352942,
      },
    ]);
  });

  it('Real value #2', () => {
    const result = generateResults({
      fundsAvailable: '5000',
      positionsPaid: '8',
      exponentBase: '5',
      yAxisShift: '-0.05',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result).toStrictEqual([
      {
        fundsAbsolute: 1285.59,
        fundsAbsoluteRoundDiff: 0.59,
        fundsAbsoluteRounded: 1285,
        fundsPerecentage: 0.2571,
        position: 1,
        xValue: 0,
        yValue: 0.95,
      },
      {
        fundsAbsolute: 1007.63,
        fundsAbsoluteRoundDiff: 2.63,
        fundsAbsoluteRounded: 1010,
        fundsPerecentage: 0.2015,
        position: 2,
        xValue: 0.14285714285714285,
        yValue: 0.7445974047018522,
      },
      {
        fundsAbsolute: 786.76,
        fundsAbsoluteRoundDiff: 1.76,
        fundsAbsoluteRounded: 785,
        fundsPerecentage: 0.1574,
        position: 3,
        xValue: 0.2857142857142857,
        yValue: 0.5813850355589192,
      },
      {
        fundsAbsolute: 611.26,
        fundsAbsoluteRoundDiff: 1.26,
        fundsAbsoluteRounded: 610,
        fundsPerecentage: 0.1223,
        position: 4,
        xValue: 0.42857142857142855,
        yValue: 0.45169691062270395,
      },
      {
        fundsAbsolute: 471.81,
        fundsAbsoluteRoundDiff: 1.81,
        fundsAbsoluteRounded: 470,
        fundsPerecentage: 0.0944,
        position: 5,
        xValue: 0.5714285714285714,
        yValue: 0.3486470631277377,
      },
      {
        fundsAbsolute: 361,
        fundsAbsoluteRoundDiff: 1,
        fundsAbsoluteRounded: 360,
        fundsPerecentage: 0.0722,
        position: 6,
        xValue: 0.7142857142857142,
        yValue: 0.26676392175331587,
      },
      {
        fundsAbsolute: 272.95,
        fundsAbsoluteRoundDiff: 2.95,
        fundsAbsoluteRounded: 275,
        fundsPerecentage: 0.0546,
        position: 7,
        xValue: 0.8571428571428571,
        yValue: 0.20169979012836536,
      },
      {
        fundsAbsolute: 202.99,
        fundsAbsoluteRoundDiff: 2.99,
        fundsAbsoluteRounded: 205,
        fundsPerecentage: 0.0406,
        position: 8,
        xValue: 1,
        yValue: 0.15000000000000002,
      },
    ]);
  });

  it('Real value #3', () => {
    const result = generateResults({
      fundsAvailable: '100000',
      positionsPaid: '43',
      exponentBase: '16',
      yAxisShift: '-0.0625',

      xRangeStart: '0',
      xRangeEnd: '1',
    });

    expect(result).toStrictEqual([
      {
        fundsAbsolute: 7779.8,
        fundsAbsoluteRoundDiff: 4.8,
        fundsAbsoluteRounded: 7780,
        fundsPerecentage: 0.0778,
        position: 1,
        xValue: 0,
        yValue: 0.9375,
      },
      {
        fundsAbsolute: 7249.68,
        fundsAbsoluteRoundDiff: 4.68,
        fundsAbsoluteRounded: 7250,
        fundsPerecentage: 0.0725,
        position: 2,
        xValue: 0.023809523809523808,
        yValue: 0.8736177424536049,
      },
      {
        fundsAbsolute: 6753.42,
        fundsAbsoluteRoundDiff: 3.42,
        fundsAbsoluteRounded: 6755,
        fundsPerecentage: 0.0675,
        position: 3,
        xValue: 0.047619047619047616,
        yValue: 0.8138164277364337,
      },
      {
        fundsAbsolute: 6288.86,
        fundsAbsoluteRoundDiff: 3.86,
        fundsAbsoluteRounded: 6290,
        fundsPerecentage: 0.0629,
        position: 4,
        xValue: 0.07142857142857142,
        yValue: 0.757835356007638,
      },
      {
        fundsAbsolute: 5853.98,
        fundsAbsoluteRoundDiff: 3.98,
        fundsAbsoluteRounded: 5855,
        fundsPerecentage: 0.0585,
        position: 5,
        xValue: 0.09523809523809523,
        yValue: 0.7054304815207443,
      },
      {
        fundsAbsolute: 5446.88,
        fundsAbsoluteRoundDiff: 1.88,
        fundsAbsoluteRounded: 5445,
        fundsPerecentage: 0.0545,
        position: 6,
        xValue: 0.11904761904761904,
        yValue: 0.656373348722509,
      },
      {
        fundsAbsolute: 5065.79,
        fundsAbsoluteRoundDiff: 0.79,
        fundsAbsoluteRounded: 5065,
        fundsPerecentage: 0.0507,
        position: 7,
        xValue: 0.14285714285714285,
        yValue: 0.6104500963161781,
      },
      {
        fundsAbsolute: 4709.05,
        fundsAbsoluteRoundDiff: 4.05,
        fundsAbsoluteRounded: 4710,
        fundsPerecentage: 0.0471,
        position: 8,
        xValue: 0.16666666666666666,
        yValue: 0.5674605249474366,
      },
      {
        fundsAbsolute: 4375.09,
        fundsAbsoluteRoundDiff: 0.09,
        fundsAbsoluteRounded: 4375,
        fundsPerecentage: 0.0438,
        position: 9,
        xValue: 0.19047619047619047,
        yValue: 0.5272172244486822,
      },
      {
        fundsAbsolute: 4062.47,
        fundsAbsoluteRoundDiff: 2.47,
        fundsAbsoluteRounded: 4060,
        fundsPerecentage: 0.0406,
        position: 10,
        xValue: 0.21428571428571427,
        yValue: 0.48954475683690624,
      },
      {
        fundsAbsolute: 3769.81,
        fundsAbsoluteRoundDiff: 4.81,
        fundsAbsoluteRounded: 3770,
        fundsPerecentage: 0.0377,
        position: 11,
        xValue: 0.23809523809523808,
        yValue: 0.45427889150351386,
      },
      {
        fundsAbsolute: 3495.86,
        fundsAbsoluteRoundDiff: 0.86,
        fundsAbsoluteRounded: 3495,
        fundsPerecentage: 0.035,
        position: 12,
        xValue: 0.26190476190476186,
        yValue: 0.42126588926194586,
      },
      {
        fundsAbsolute: 3239.4,
        fundsAbsoluteRoundDiff: 4.4,
        fundsAbsoluteRounded: 3240,
        fundsPerecentage: 0.0324,
        position: 13,
        xValue: 0.2857142857142857,
        yValue: 0.39036183213195336,
      },
      {
        fundsAbsolute: 2999.33,
        fundsAbsoluteRoundDiff: 4.33,
        fundsAbsoluteRounded: 3000,
        fundsPerecentage: 0.03,
        position: 14,
        xValue: 0.30952380952380953,
        yValue: 0.3614319959387675,
      },
      {
        fundsAbsolute: 2774.59,
        fundsAbsoluteRoundDiff: 4.59,
        fundsAbsoluteRounded: 2775,
        fundsPerecentage: 0.0277,
        position: 15,
        xValue: 0.3333333333333333,
        yValue: 0.3343502629920499,
      },
      {
        fundsAbsolute: 2564.21,
        fundsAbsoluteRoundDiff: 4.21,
        fundsAbsoluteRounded: 2565,
        fundsPerecentage: 0.0256,
        position: 16,
        xValue: 0.3571428571428571,
        yValue: 0.30899857228423716,
      },
      {
        fundsAbsolute: 2367.27,
        fundsAbsoluteRoundDiff: 2.27,
        fundsAbsoluteRounded: 2365,
        fundsPerecentage: 0.0237,
        position: 17,
        xValue: 0.38095238095238093,
        yValue: 0.28526640481145743,
      },
      {
        fundsAbsolute: 2182.91,
        fundsAbsoluteRoundDiff: 2.91,
        fundsAbsoluteRounded: 2185,
        fundsPerecentage: 0.0218,
        position: 18,
        xValue: 0.40476190476190477,
        yValue: 0.26305030177330796,
      },
      {
        fundsAbsolute: 2010.33,
        fundsAbsoluteRoundDiff: 0.33,
        fundsAbsoluteRounded: 2010,
        fundsPerecentage: 0.0201,
        position: 19,
        xValue: 0.42857142857142855,
        yValue: 0.2422534135511189,
      },
      {
        fundsAbsolute: 1848.77,
        fundsAbsoluteRoundDiff: 3.77,
        fundsAbsoluteRounded: 1850,
        fundsPerecentage: 0.0185,
        position: 20,
        xValue: 0.45238095238095233,
        yValue: 0.2227850774985033,
      },
      {
        fundsAbsolute: 1697.54,
        fundsAbsoluteRoundDiff: 2.54,
        fundsAbsoluteRounded: 1695,
        fundsPerecentage: 0.017,
        position: 21,
        xValue: 0.47619047619047616,
        yValue: 0.2045604227036006,
      },
      {
        fundsAbsolute: 1555.96,
        fundsAbsoluteRoundDiff: 0.96,
        fundsAbsoluteRounded: 1555,
        fundsPerecentage: 0.0156,
        position: 22,
        xValue: 0.5,
        yValue: 0.1875,
      },
      {
        fundsAbsolute: 1423.43,
        fundsAbsoluteRoundDiff: 3.43,
        fundsAbsoluteRounded: 1425,
        fundsPerecentage: 0.0142,
        position: 23,
        xValue: 0.5238095238095237,
        yValue: 0.17152943561340128,
      },
      {
        fundsAbsolute: 1299.36,
        fundsAbsoluteRoundDiff: 4.36,
        fundsAbsoluteRounded: 1300,
        fundsPerecentage: 0.013,
        position: 24,
        xValue: 0.5476190476190476,
        yValue: 0.15657910693410848,
      },
      {
        fundsAbsolute: 1183.23,
        fundsAbsoluteRoundDiff: 3.23,
        fundsAbsoluteRounded: 1185,
        fundsPerecentage: 0.0118,
        position: 25,
        xValue: 0.5714285714285714,
        yValue: 0.14258383900190952,
      },
      {
        fundsAbsolute: 1074.51,
        fundsAbsoluteRoundDiff: 4.51,
        fundsAbsoluteRounded: 1075,
        fundsPerecentage: 0.0107,
        position: 26,
        xValue: 0.5952380952380952,
        yValue: 0.12948262038018607,
      },
      {
        fundsAbsolute: 972.73,
        fundsAbsoluteRoundDiff: 2.73,
        fundsAbsoluteRounded: 970,
        fundsPerecentage: 0.0097,
        position: 27,
        xValue: 0.6190476190476191,
        yValue: 0.11721833718062721,
      },
      {
        fundsAbsolute: 877.46,
        fundsAbsoluteRoundDiff: 2.46,
        fundsAbsoluteRounded: 875,
        fundsPerecentage: 0.0088,
        position: 28,
        xValue: 0.6428571428571428,
        yValue: 0.10573752407904455,
      },
      {
        fundsAbsolute: 788.27,
        fundsAbsoluteRoundDiff: 3.27,
        fundsAbsoluteRounded: 790,
        fundsPerecentage: 0.0079,
        position: 29,
        xValue: 0.6666666666666666,
        yValue: 0.09499013123685918,
      },
      {
        fundsAbsolute: 704.78,
        fundsAbsoluteRoundDiff: 4.78,
        fundsAbsoluteRounded: 705,
        fundsPerecentage: 0.007,
        position: 30,
        xValue: 0.6904761904761905,
        yValue: 0.08492930611217056,
      },
      {
        fundsAbsolute: 626.63,
        fundsAbsoluteRoundDiff: 1.63,
        fundsAbsoluteRounded: 625,
        fundsPerecentage: 0.0063,
        position: 31,
        xValue: 0.7142857142857142,
        yValue: 0.07551118920922659,
      },
      {
        fundsAbsolute: 553.46,
        fundsAbsoluteRoundDiff: 3.46,
        fundsAbsoluteRounded: 555,
        fundsPerecentage: 0.0055,
        position: 32,
        xValue: 0.738095238095238,
        yValue: 0.06669472287587849,
      },
      {
        fundsAbsolute: 484.97,
        fundsAbsoluteRoundDiff: 4.97,
        fundsAbsoluteRounded: 485,
        fundsPerecentage: 0.0048,
        position: 33,
        xValue: 0.7619047619047619,
        yValue: 0.058441472315486465,
      },
      {
        fundsAbsolute: 420.86,
        fundsAbsoluteRoundDiff: 0.86,
        fundsAbsoluteRounded: 420,
        fundsPerecentage: 0.0042,
        position: 34,
        xValue: 0.7857142857142857,
        yValue: 0.05071545803298834,
      },
      {
        fundsAbsolute: 360.84,
        fundsAbsoluteRoundDiff: 0.84,
        fundsAbsoluteRounded: 360,
        fundsPerecentage: 0.0036,
        position: 35,
        xValue: 0.8095238095238095,
        yValue: 0.04348299898469188,
      },
      {
        fundsAbsolute: 304.66,
        fundsAbsoluteRoundDiff: 4.66,
        fundsAbsoluteRounded: 305,
        fundsPerecentage: 0.003,
        position: 36,
        xValue: 0.8333333333333333,
        yValue: 0.03671256574801249,
      },
      {
        fundsAbsolute: 252.06,
        fundsAbsoluteRoundDiff: 2.06,
        fundsAbsoluteRounded: 250,
        fundsPerecentage: 0.0025,
        position: 37,
        xValue: 0.8571428571428571,
        yValue: 0.03037464307105929,
      },
      {
        fundsAbsolute: 202.83,
        fundsAbsoluteRoundDiff: 2.83,
        fundsAbsoluteRounded: 205,
        fundsPerecentage: 0.002,
        position: 38,
        xValue: 0.8809523809523809,
        yValue: 0.024441601202864358,
      },
      {
        fundsAbsolute: 156.74,
        fundsAbsoluteRoundDiff: 1.74,
        fundsAbsoluteRounded: 155,
        fundsPerecentage: 0.0016,
        position: 39,
        xValue: 0.9047619047619047,
        yValue: 0.018887575443327018,
      },
      {
        fundsAbsolute: 113.59,
        fundsAbsoluteRoundDiff: 3.59,
        fundsAbsoluteRounded: 115,
        fundsPerecentage: 0.0011,
        position: 40,
        xValue: 0.9285714285714285,
        yValue: 0.01368835338777974,
      },
      {
        fundsAbsolute: 73.2,
        fundsAbsoluteRoundDiff: 3.2,
        fundsAbsoluteRounded: 75,
        fundsPerecentage: 0.0007,
        position: 41,
        xValue: 0.9523809523809523,
        yValue: 0.008821269374625823,
      },
      {
        fundsAbsolute: 35.39,
        fundsAbsoluteRoundDiff: 0.39,
        fundsAbsoluteRounded: 35,
        fundsPerecentage: 0.0004,
        position: 42,
        xValue: 0.9761904761904762,
        yValue: 0.0042651056759001466,
      },
      {
        fundsAbsolute: 0,
        fundsAbsoluteRoundDiff: 0,
        fundsAbsoluteRounded: 0,
        fundsPerecentage: 0,
        position: 43,
        xValue: 1,
        yValue: 0,
      },
    ]);
  });
});
