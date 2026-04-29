import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

import type { dataPoint } from './results-exponent.ts';

interface props {
  data: readonly dataPoint[];
}

// value formatter to make tooltip popup a little nicer
const currencyFormatter = (value: number | null) => {
  if (value === null) return '$0';
  return '$' + value.toLocaleString(navigator.language);
};

const roundUpTo = (value: number, roundDownToNearest: number) => {
  return Math.ceil(value / roundDownToNearest) * roundDownToNearest;
};

const PayChart = (props: props) => {
  const { data } = props;

  // find max value to format y-axis width
  const yMax = data.reduce(function (prev, current) {
    return prev.fundsAbsoluteRounded > current.fundsAbsoluteRounded
      ? prev
      : current;
  }).fundsAbsoluteRounded;

  const roundTo = Math.pow(10, yMax.toString().length - 1) * 2;
  const topVal = roundUpTo(yMax, roundTo);

  let yWidth = 75;
  if (topVal.toString().length === 5) yWidth = 60;
  else if (topVal.toString().length === 4) yWidth = 50;
  else if (topVal.toString().length <= 3) yWidth = 40;

  // component render
  return (
    <Box component={Paper} sx={{ minHeight: 400 }}>
      <LineChart
        dataset={data}
        xAxis={[{ dataKey: 'position', label: 'Position', min: 1 }]}
        yAxis={[
          {
            width: yWidth,
            min: 0,
            valueFormatter: currencyFormatter,
          },
        ]}
        series={[
          {
            dataKey: 'fundsAbsoluteRounded',
            label: 'Actual',
            color: 'blue',
            valueFormatter: currencyFormatter,
          },
          {
            dataKey: 'fundsAbsolute',
            label: 'Ideal',
            color: 'green',
            valueFormatter: currencyFormatter,
          },
        ]}
      />
    </Box>
  );
};

export default PayChart;
