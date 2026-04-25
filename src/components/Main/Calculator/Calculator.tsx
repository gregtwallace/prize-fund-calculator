import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import type { inputParams } from './inputs.ts';
import { inputConformation } from './inputs.ts';

// default values
const inputParamsDefault: inputParams = {
  positionsPaid: 20,
  fundsAvailable: 10000,
  exponentBase: 8.5,
  yAxisShift: 0.1,
};

const Calculator = () => {
  const [calcParams, setCalcParams] = useState<inputParams>(inputParamsDefault);

  // param handlers
  const formFieldPositionsPaidChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      const newPosPaid = Number.parseInt(event.target.value);
      return inputConformation({
        ...prevState,
        positionsPaid: newPosPaid,
      });
    });
  };

  const formFieldFundsAvailableChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      const newFunds = Number.parseInt(event.target.value);
      return inputConformation({
        ...prevState,
        fundsAvailable: newFunds,
      });
    });
  };

  const formFieldExponentBaseChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      const newBase = Number.parseFloat(event.target.value);

      return inputConformation({
        ...prevState,
        exponentBase: newBase,
      });
    });
  };

  const formFieldYAxisShiftChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      const newYAxisShift = Number.parseFloat(event.target.value);

      return inputConformation({
        ...prevState,
        yAxisShift: newYAxisShift,
      });
    });
  };

  return (
    <Container maxWidth='lg'>
      <Paper
        sx={{
          my: 6,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          }}
        >
          <Box
            component='form'
            sx={{
              p: { xs: 3, sm: 4 },
              borderRight: { md: '1px solid #E2E8F0' },
              borderBottom: { xs: '1px solid #E2E8F0', md: 'none' },
            }}
          >
            <TextField
              id='positions-paid'
              name='positions-paid'
              label='Positions Paid'
              type='number'
              value={calcParams.positionsPaid}
              onChange={formFieldPositionsPaidChangeHandler}
              fullWidth
              variant='outlined'
              sx={{ my: 1 }}
            />

            <TextField
              id='funds-available'
              name='funds-available'
              label='Total Funds Available'
              type='number'
              value={calcParams.fundsAvailable}
              onChange={formFieldFundsAvailableChangeHandler}
              fullWidth
              variant='outlined'
              sx={{ my: 1 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>$</InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              id='exponent-base'
              name='exponent-base'
              label='Exponent Base'
              type='number'
              value={calcParams.exponentBase}
              onChange={formFieldExponentBaseChangeHandler}
              fullWidth
              variant='outlined'
              sx={{ my: 1 }}
            />

            <TextField
              id='y-axis-shift'
              name='y-axis-shift'
              label='Y-Axis Shift'
              type='number'
              value={calcParams.yAxisShift}
              onChange={formFieldYAxisShiftChangeHandler}
              fullWidth
              variant='outlined'
              sx={{ my: 1 }}
            />
          </Box>

          <Box sx={{ p: { xs: 3, sm: 4 } }}>TODO: Graph</Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Calculator;
