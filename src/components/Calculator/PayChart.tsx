import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

import type { dataPoint } from './results.ts';

interface props {
  data: readonly dataPoint[];
}

const PayChart = (props: props) => {
  const { data } = props;

  return (
    <Box sx={{ minHeight: 400, p: 1 }}>
      <LineChart
        dataset={data}
        xAxis={[{ dataKey: 'position', label: 'Position', min: 1 }]}
        yAxis={[{ label: '$ Payout', min: 0 }]}
        series={[
          {
            dataKey: 'fundsAbsoluteRounded',
            // label: 'Payout',
            color: 'blue',
          },
          // {
          //   dataKey: 'fundsAbsolute',
          //   label: 'Ideal Curve',
          //   color: 'green',
          // },
        ]}
      />
    </Box>
  );
};

export default PayChart;
