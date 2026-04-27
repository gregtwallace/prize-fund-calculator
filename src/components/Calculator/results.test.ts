import { describe, expect, it } from 'vitest';
import { generateResults } from './results';

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
        fundsAbsolute: 962.830253546803,
        fundsAbsoluteRoundDiff: 2.8302535468029646,
        fundsAbsoluteRounded: 965,
        fundsPerecentage: 0.0962830253546803,
        position: 1,
        xValue: 0,
        yValue: 1.1,
      },
      {
        fundsAbsolute: 878.0247890687938,
        fundsAbsoluteRoundDiff: 3.0247890687937797,
        fundsAbsoluteRounded: 880,
        fundsPerecentage: 0.08780247890687938,
        position: 2,
        xValue: 0.047619047619047616,
        yValue: 1.0031127131888826,
      },
      {
        fundsAbsolute: 801.4358959508157,
        fundsAbsoluteRoundDiff: 1.435895950815734,
        fundsAbsoluteRounded: 800,
        fundsPerecentage: 0.08014358959508157,
        position: 3,
        xValue: 0.09523809523809523,
        yValue: 0.9156125727233849,
      },
      {
        fundsAbsolute: 732.267492886905,
        fundsAbsoluteRoundDiff: 2.267492886904961,
        fundsAbsoluteRounded: 730,
        fundsPerecentage: 0.0732267492886905,
        position: 4,
        xValue: 0.14285714285714285,
        yValue: 0.8365900834631809,
      },
      {
        fundsAbsolute: 669.8006287289145,
        fundsAbsoluteRoundDiff: 4.800628728914489,
        fundsAbsoluteRounded: 670,
        fundsPerecentage: 0.06698006287289145,
        position: 5,
        xValue: 0.19047619047619047,
        yValue: 0.7652238687844588,
      },
      {
        fundsAbsolute: 613.3860095547902,
        fundsAbsoluteRoundDiff: 3.3860095547902347,
        fundsAbsoluteRounded: 615,
        fundsPerecentage: 0.06133860095547902,
        position: 6,
        xValue: 0.23809523809523808,
        yValue: 0.7007721330159378,
      },
      {
        fundsAbsolute: 562.4372497689294,
        fundsAbsoluteRoundDiff: 2.437249768929405,
        fundsAbsoluteRounded: 565,
        fundsPerecentage: 0.056243724976892936,
        position: 7,
        xValue: 0.2857142857142857,
        yValue: 0.6425649510562959,
      },
      {
        fundsAbsolute: 516.4247770851119,
        fundsAbsoluteRoundDiff: 1.4247770851119412,
        fundsAbsoluteRounded: 515,
        fundsPerecentage: 0.05164247770851119,
        position: 8,
        xValue: 0.3333333333333333,
        yValue: 0.5899973050296446,
      },
      {
        fundsAbsolute: 474.87032803910023,
        fundsAbsoluteRoundDiff: 4.8703280391002295,
        fundsAbsoluteRounded: 475,
        fundsPerecentage: 0.04748703280391002,
        position: 9,
        xValue: 0.38095238095238093,
        yValue: 0.5425227956005628,
      },
      {
        fundsAbsolute: 437.3419768160874,
        fundsAbsoluteRoundDiff: 2.341976816087424,
        fundsAbsoluteRounded: 435,
        fundsPerecentage: 0.043734197681608744,
        position: 10,
        xValue: 0.42857142857142855,
        yValue: 0.4996479625827537,
      },
      {
        fundsAbsolute: 403.4496457215669,
        fundsAbsoluteRoundDiff: 3.449645721566924,
        fundsAbsoluteRounded: 405,
        fundsPerecentage: 0.040344964572156694,
        position: 11,
        xValue: 0.47619047619047616,
        yValue: 0.4609271558085196,
      },
      {
        fundsAbsolute: 372.84105063049884,
        fundsAbsoluteRoundDiff: 2.8410506304988417,
        fundsAbsoluteRounded: 375,
        fundsPerecentage: 0.03728410506304988,
        position: 12,
        xValue: 0.5238095238095237,
        yValue: 0.42595790294577884,
      },
      {
        fundsAbsolute: 345.1980392709042,
        fundsAbsoluteRoundDiff: 0.19803927090418938,
        fundsAbsoluteRounded: 345,
        fundsPerecentage: 0.03451980392709042,
        position: 13,
        xValue: 0.5714285714285714,
        yValue: 0.39437672611472074,
      },
      {
        fundsAbsolute: 320.2332842812296,
        fundsAbsoluteRoundDiff: 0.23328428122960077,
        fundsAbsoluteRounded: 320,
        fundsPerecentage: 0.03202332842812296,
        position: 14,
        xValue: 0.6190476190476191,
        yValue: 0.36585536382112593,
      },
      {
        fundsAbsolute: 297.687296668409,
        fundsAbsoluteRoundDiff: 2.687296668408976,
        fundsAbsoluteRounded: 300,
        fundsPerecentage: 0.029768729666840896,
        position: 15,
        xValue: 0.6666666666666666,
        yValue: 0.34009735893631465,
      },
      {
        fundsAbsolute: 277.3257286238715,
        fundsAbsoluteRoundDiff: 2.3257286238714983,
        fundsAbsoluteRounded: 275,
        fundsPerecentage: 0.027732572862387152,
        position: 16,
        xValue: 0.7142857142857142,
        yValue: 0.3168349772584601,
      },
      {
        fundsAbsolute: 258.9369376623893,
        fundsAbsoluteRoundDiff: 3.9369376623893118,
        fundsAbsoluteRounded: 260,
        fundsPerecentage: 0.02589369376623893,
        position: 17,
        xValue: 0.7619047619047619,
        yValue: 0.29582642462613756,
      },
      {
        fundsAbsolute: 242.32978676490185,
        fundsAbsoluteRoundDiff: 2.329786764901854,
        fundsAbsoluteRounded: 240,
        fundsPerecentage: 0.024232978676490186,
        position: 18,
        xValue: 0.8095238095238095,
        yValue: 0.2768533336581893,
      },
      {
        fundsAbsolute: 227.33165765953478,
        fundsAbsoluteRoundDiff: 2.331657659534784,
        fundsAbsoluteRounded: 225,
        fundsPerecentage: 0.022733165765953477,
        position: 19,
        xValue: 0.8571428571428571,
        yValue: 0.25971849399654606,
      },
      {
        fundsAbsolute: 213.7866565904296,
        fundsAbsoluteRoundDiff: 3.786656590429601,
        fundsAbsoluteRounded: 215,
        fundsPerecentage: 0.02137866565904296,
        position: 20,
        xValue: 0.9047619047619047,
        yValue: 0.24424380245966298,
      },
      {
        fundsAbsolute: 201.5539939247637,
        fundsAbsoluteRoundDiff: 1.553993924763688,
        fundsAbsoluteRounded: 200,
        fundsPerecentage: 0.02015539939247637,
        position: 21,
        xValue: 0.9523809523809523,
        yValue: 0.23026841180002744,
      },
      {
        fundsAbsolute: 190.50652075524977,
        fundsAbsoluteRoundDiff: 0.5065207552497668,
        fundsAbsoluteRounded: 190,
        fundsPerecentage: 0.019050652075524976,
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
        fundsAbsolute: 1285.5939953699265,
        fundsAbsoluteRoundDiff: 0.5939953699264606,
        fundsAbsoluteRounded: 1285,
        fundsPerecentage: 0.25711879907398527,
        position: 1,
        xValue: 0,
        yValue: 0.95,
      },
      {
        fundsAbsolute: 1007.6315288976128,
        fundsAbsoluteRoundDiff: 2.6315288976128386,
        fundsAbsoluteRounded: 1010,
        fundsPerecentage: 0.20152630577952257,
        position: 2,
        xValue: 0.14285714285714285,
        yValue: 0.7445974047018522,
      },
      {
        fundsAbsolute: 786.7632744341871,
        fundsAbsoluteRoundDiff: 1.7632744341871103,
        fundsAbsoluteRounded: 785,
        fundsPerecentage: 0.15735265488683742,
        position: 3,
        xValue: 0.2857142857142857,
        yValue: 0.5813850355589192,
      },
      {
        fundsAbsolute: 611.2619326565206,
        fundsAbsoluteRoundDiff: 1.261932656520571,
        fundsAbsoluteRounded: 610,
        fundsPerecentage: 0.12225238653130412,
        position: 4,
        xValue: 0.42857142857142855,
        yValue: 0.45169691062270395,
      },
      {
        fundsAbsolute: 471.80902195829395,
        fundsAbsoluteRoundDiff: 1.809021958293954,
        fundsAbsoluteRounded: 470,
        fundsPerecentage: 0.0943618043916588,
        position: 5,
        xValue: 0.5714285714285714,
        yValue: 0.3486470631277377,
      },
      {
        fundsAbsolute: 361.000101039364,
        fundsAbsoluteRoundDiff: 1.000101039363983,
        fundsAbsoluteRounded: 360,
        fundsPerecentage: 0.07220002020787279,
        position: 6,
        xValue: 0.7142857142857142,
        yValue: 0.26676392175331587,
      },
      {
        fundsAbsolute: 272.95162005936936,
        fundsAbsoluteRoundDiff: 2.951620059369361,
        fundsAbsoluteRounded: 275,
        fundsPerecentage: 0.05459032401187387,
        position: 7,
        xValue: 0.8571428571428571,
        yValue: 0.20169979012836536,
      },
      {
        fundsAbsolute: 202.98852558472527,
        fundsAbsoluteRoundDiff: 2.9885255847252665,
        fundsAbsoluteRounded: 205,
        fundsPerecentage: 0.040597705116945056,
        position: 8,
        xValue: 1,
        yValue: 0.15000000000000002,
      },
    ]);
  });

  it('Real value #2', () => {
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
        fundsAbsolute: 7779.801314001898,
        fundsAbsoluteRoundDiff: 4.80131400189839,
        fundsAbsoluteRounded: 7780,
        fundsPerecentage: 0.07779801314001898,
        position: 1,
        xValue: 0,
        yValue: 0.9375,
      },
      {
        fundsAbsolute: 7249.677291387656,
        fundsAbsoluteRoundDiff: 4.677291387655714,
        fundsAbsoluteRounded: 7250,
        fundsPerecentage: 0.07249677291387656,
        position: 2,
        xValue: 0.023809523809523808,
        yValue: 0.8736177424536049,
      },
      {
        fundsAbsolute: 6753.418788117587,
        fundsAbsoluteRoundDiff: 3.4187881175867005,
        fundsAbsoluteRounded: 6755,
        fundsPerecentage: 0.06753418788117586,
        position: 3,
        xValue: 0.047619047619047616,
        yValue: 0.8138164277364337,
      },
      {
        fundsAbsolute: 6288.862398363006,
        fundsAbsoluteRoundDiff: 3.862398363005923,
        fundsAbsoluteRounded: 6290,
        fundsPerecentage: 0.06288862398363006,
        position: 4,
        xValue: 0.07142857142857142,
        yValue: 0.757835356007638,
      },
      {
        fundsAbsolute: 5853.9829195435495,
        fundsAbsoluteRoundDiff: 3.982919543549542,
        fundsAbsoluteRounded: 5855,
        fundsPerecentage: 0.058539829195435496,
        position: 5,
        xValue: 0.09523809523809523,
        yValue: 0.7054304815207443,
      },
      {
        fundsAbsolute: 5446.8845235916815,
        fundsAbsoluteRoundDiff: 1.8845235916815,
        fundsAbsoluteRounded: 5445,
        fundsPerecentage: 0.054468845235916816,
        position: 6,
        xValue: 0.11904761904761904,
        yValue: 0.656373348722509,
      },
      {
        fundsAbsolute: 5065.792492216734,
        fundsAbsoluteRoundDiff: 0.7924922167339901,
        fundsAbsoluteRounded: 5065,
        fundsPerecentage: 0.050657924922167336,
        position: 7,
        xValue: 0.14285714285714285,
        yValue: 0.6104500963161781,
      },
      {
        fundsAbsolute: 4709.045480138959,
        fundsAbsoluteRoundDiff: 4.045480138958737,
        fundsAbsoluteRounded: 4710,
        fundsPerecentage: 0.04709045480138959,
        position: 8,
        xValue: 0.16666666666666666,
        yValue: 0.5674605249474366,
      },
      {
        fundsAbsolute: 4375.088272565644,
        fundsAbsoluteRoundDiff: 0.08827256564381969,
        fundsAbsoluteRounded: 4375,
        fundsPerecentage: 0.04375088272565644,
        position: 9,
        xValue: 0.19047619047619047,
        yValue: 0.5272172244486822,
      },
      {
        fundsAbsolute: 4062.465005336003,
        fundsAbsoluteRoundDiff: 2.4650053360028323,
        fundsAbsoluteRounded: 4060,
        fundsPerecentage: 0.04062465005336003,
        position: 10,
        xValue: 0.21428571428571427,
        yValue: 0.48954475683690624,
      },
      {
        fundsAbsolute: 3769.81281817852,
        fundsAbsoluteRoundDiff: 4.812818178520047,
        fundsAbsoluteRounded: 3770,
        fundsPerecentage: 0.0376981281817852,
        position: 11,
        xValue: 0.23809523809523808,
        yValue: 0.45427889150351386,
      },
      {
        fundsAbsolute: 3495.855913412549,
        fundsAbsoluteRoundDiff: 0.8559134125489436,
        fundsAbsoluteRounded: 3495,
        fundsPerecentage: 0.03495855913412549,
        position: 12,
        xValue: 0.26190476190476186,
        yValue: 0.42126588926194586,
      },
      {
        fundsAbsolute: 3239.3999941934494,
        fundsAbsoluteRoundDiff: 4.399994193449402,
        fundsAbsoluteRounded: 3240,
        fundsPerecentage: 0.032393999941934495,
        position: 13,
        xValue: 0.2857142857142857,
        yValue: 0.39036183213195336,
      },
      {
        fundsAbsolute: 2999.327058055202,
        fundsAbsoluteRoundDiff: 4.327058055202087,
        fundsAbsoluteRounded: 3000,
        fundsPerecentage: 0.029993270580552022,
        position: 14,
        xValue: 0.30952380952380953,
        yValue: 0.3614319959387675,
      },
      {
        fundsAbsolute: 2774.590523053259,
        fundsAbsoluteRoundDiff: 4.5905230532589485,
        fundsAbsoluteRounded: 2775,
        fundsPerecentage: 0.027745905230532587,
        position: 15,
        xValue: 0.3333333333333333,
        yValue: 0.3343502629920499,
      },
      {
        fundsAbsolute: 2564.2106652603934,
        fundsAbsoluteRoundDiff: 4.210665260393398,
        fundsAbsoluteRounded: 2565,
        fundsPerecentage: 0.025642106652603934,
        position: 16,
        xValue: 0.3571428571428571,
        yValue: 0.30899857228423716,
      },
      {
        fundsAbsolute: 2367.2703477256255,
        fundsAbsoluteRoundDiff: 2.27034772562547,
        fundsAbsoluteRounded: 2365,
        fundsPerecentage: 0.023672703477256255,
        position: 17,
        xValue: 0.38095238095238093,
        yValue: 0.28526640481145743,
      },
      {
        fundsAbsolute: 2182.9110222768822,
        fundsAbsoluteRoundDiff: 2.9110222768822496,
        fundsAbsoluteRounded: 2185,
        fundsPerecentage: 0.021829110222768823,
        position: 18,
        xValue: 0.40476190476190477,
        yValue: 0.26305030177330796,
      },
      {
        fundsAbsolute: 2010.3289867375358,
        fundsAbsoluteRoundDiff: 0.3289867375358426,
        fundsAbsoluteRounded: 2010,
        fundsPerecentage: 0.02010328986737536,
        position: 19,
        xValue: 0.42857142857142855,
        yValue: 0.2422534135511189,
      },
      {
        fundsAbsolute: 1848.7718812403953,
        fundsAbsoluteRoundDiff: 3.7718812403952597,
        fundsAbsoluteRounded: 1850,
        fundsPerecentage: 0.018487718812403953,
        position: 20,
        xValue: 0.45238095238095233,
        yValue: 0.2227850774985033,
      },
      {
        fundsAbsolute: 1697.5354083650727,
        fundsAbsoluteRoundDiff: 2.535408365072726,
        fundsAbsoluteRounded: 1695,
        fundsPerecentage: 0.016975354083650727,
        position: 21,
        xValue: 0.47619047619047616,
        yValue: 0.2045604227036006,
      },
      {
        fundsAbsolute: 1555.9602628003795,
        fundsAbsoluteRoundDiff: 0.9602628003794962,
        fundsAbsoluteRounded: 1555,
        fundsPerecentage: 0.015559602628003795,
        position: 22,
        xValue: 0.5,
        yValue: 0.1875,
      },
      {
        fundsAbsolute: 1423.4292571468195,
        fundsAbsoluteRoundDiff: 3.429257146819509,
        fundsAbsoluteRounded: 1425,
        fundsPerecentage: 0.014234292571468195,
        position: 23,
        xValue: 0.5238095238095237,
        yValue: 0.17152943561340128,
      },
      {
        fundsAbsolute: 1299.3646313293023,
        fundsAbsoluteRoundDiff: 4.364631329302256,
        fundsAbsoluteRounded: 1300,
        fundsPerecentage: 0.012993646313293023,
        position: 24,
        xValue: 0.5476190476190476,
        yValue: 0.15657910693410848,
      },
      {
        fundsAbsolute: 1183.2255338906568,
        fundsAbsoluteRoundDiff: 3.225533890656834,
        fundsAbsoluteRounded: 1185,
        fundsPerecentage: 0.011832255338906568,
        position: 25,
        xValue: 0.5714285714285714,
        yValue: 0.14258383900190952,
      },
      {
        fundsAbsolute: 1074.5056641857925,
        fundsAbsoluteRoundDiff: 4.5056641857925115,
        fundsAbsoluteRounded: 1075,
        fundsPerecentage: 0.010745056641857926,
        position: 26,
        xValue: 0.5952380952380952,
        yValue: 0.12948262038018607,
      },
      {
        fundsAbsolute: 972.7310651978252,
        fundsAbsoluteRoundDiff: 2.73106519782516,
        fundsAbsoluteRounded: 970,
        fundsPerecentage: 0.009727310651978252,
        position: 27,
        xValue: 0.6190476190476191,
        yValue: 0.11721833718062721,
      },
      {
        fundsAbsolute: 877.4580573540887,
        fundsAbsoluteRoundDiff: 2.458057354088737,
        fundsAbsoluteRounded: 875,
        fundsPerecentage: 0.008774580573540887,
        position: 28,
        xValue: 0.6428571428571428,
        yValue: 0.10573752407904455,
      },
      {
        fundsAbsolute: 788.2713043346452,
        fundsAbsoluteRoundDiff: 3.2713043346451514,
        fundsAbsoluteRounded: 790,
        fundsPerecentage: 0.007882713043346451,
        position: 29,
        xValue: 0.6666666666666666,
        yValue: 0.09499013123685918,
      },
      {
        fundsAbsolute: 704.7820024413162,
        fundsAbsoluteRoundDiff: 4.782002441316195,
        fundsAbsoluteRounded: 705,
        fundsPerecentage: 0.007047820024413162,
        position: 30,
        xValue: 0.6904761904761905,
        yValue: 0.08492930611217056,
      },
      {
        fundsAbsolute: 626.6261856339061,
        fundsAbsoluteRoundDiff: 1.6261856339060614,
        fundsAbsoluteRounded: 625,
        fundsPerecentage: 0.006266261856339061,
        position: 31,
        xValue: 0.7142857142857142,
        yValue: 0.07551118920922659,
      },
      {
        fundsAbsolute: 553.4631388445354,
        fundsAbsoluteRoundDiff: 3.463138844535365,
        fundsAbsoluteRounded: 555,
        fundsPerecentage: 0.005534631388445354,
        position: 32,
        xValue: 0.738095238095238,
        yValue: 0.06669472287587849,
      },
      {
        fundsAbsolute: 484.9739126530423,
        fundsAbsoluteRoundDiff: 4.973912653042305,
        fundsAbsoluteRounded: 485,
        fundsPerecentage: 0.004849739126530423,
        position: 33,
        xValue: 0.7619047619047619,
        yValue: 0.058441472315486465,
      },
      {
        fundsAbsolute: 420.85993284826753,
        fundsAbsoluteRoundDiff: 0.8599328482675332,
        fundsAbsoluteRounded: 420,
        fundsPerecentage: 0.0042085993284826755,
        position: 34,
        xValue: 0.7857142857142857,
        yValue: 0.05071545803298834,
      },
      {
        fundsAbsolute: 360.84169881370565,
        fundsAbsoluteRoundDiff: 0.8416988137056478,
        fundsAbsoluteRounded: 360,
        fundsPerecentage: 0.0036084169881370567,
        position: 35,
        xValue: 0.8095238095238095,
        yValue: 0.04348299898469188,
      },
      {
        fundsAbsolute: 304.65756506321986,
        fundsAbsoluteRoundDiff: 4.657565063219863,
        fundsAbsoluteRounded: 305,
        fundsPerecentage: 0.003046575650632199,
        position: 36,
        xValue: 0.8333333333333333,
        yValue: 0.03671256574801249,
      },
      {
        fundsAbsolute: 252.06260061500342,
        fundsAbsoluteRoundDiff: 2.0626006150034186,
        fundsAbsoluteRounded: 250,
        fundsPerecentage: 0.0025206260061500342,
        position: 37,
        xValue: 0.8571428571428571,
        yValue: 0.03037464307105929,
      },
      {
        fundsAbsolute: 202.82752123131147,
        fundsAbsoluteRoundDiff: 2.827521231311465,
        fundsAbsoluteRounded: 205,
        fundsPerecentage: 0.0020282752123131145,
        position: 38,
        xValue: 0.8809523809523809,
        yValue: 0.024441601202864358,
      },
      {
        fundsAbsolute: 156.7376898691259,
        fundsAbsoluteRoundDiff: 1.7376898691258873,
        fundsAbsoluteRounded: 155,
        fundsPerecentage: 0.0015673768986912589,
        position: 39,
        xValue: 0.9047619047619047,
        yValue: 0.018887575443327018,
      },
      {
        fundsAbsolute: 113.59218098428921,
        fundsAbsoluteRoundDiff: 3.5921809842892145,
        fundsAbsoluteRounded: 115,
        fundsPerecentage: 0.0011359218098428922,
        position: 40,
        xValue: 0.9285714285714285,
        yValue: 0.01368835338777974,
      },
      {
        fundsAbsolute: 73.20290461000393,
        fundsAbsoluteRoundDiff: 3.2029046100039267,
        fundsAbsoluteRounded: 75,
        fundsPerecentage: 0.0007320290461000393,
        position: 41,
        xValue: 0.9523809523809523,
        yValue: 0.008821269374625823,
      },
      {
        fundsAbsolute: 35.39378639117324,
        fundsAbsoluteRoundDiff: 0.39378639117324354,
        fundsAbsoluteRounded: 35,
        fundsPerecentage: 0.00035393786391173243,
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
