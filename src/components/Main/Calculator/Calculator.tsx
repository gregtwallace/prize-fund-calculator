import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

// user specified configuration values for the calculator
interface params {
  positionsPaid: number;
  fundsAvailable: number;
  exponentBase: number;
  yAxisShift: number;
}

// default values
const defaultParams: params = {
  positionsPaid: 20,
  fundsAvailable: 10000,
  exponentBase: 8.5,
  yAxisShift: 0.1,
};

// function to calculate minimum acceptable yAxisShift for a given base
const minYAxisShift = (base: number) => -1 / base;

// function to return max base for a given prize fund
const maxBase = (fundsAvailable: number) => fundsAvailable * 215;

const Calculator = () => {
  const [calcParams, setCalcParams] = useState<params>(defaultParams);

  // param handlers
  const formFieldPositionsPaidChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      let newPosPaid = Number.parseInt(event.target.value);

      // enforce minimum of 3
      if (newPosPaid < 2) newPosPaid = 3;

      return {
        ...prevState,
        positionsPaid: newPosPaid,
      };
    });
  };

  const formFieldFundsAvailableChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      let newFunds = Number.parseInt(event.target.value);

      // enforce minimum of 100
      if (newFunds < 100) newFunds = 100;

      return {
        ...prevState,
        fundsAvailable: newFunds,
      };
    });
  };

  const formFieldExponentBaseChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      let newBase = Number.parseFloat(event.target.value);

      // must be greater than 0
      if (newBase <= 0) {
        newBase = 0.1;
      }

      // cannot be 1
      if (newBase === 1) {
        // increasing base
        if (prevState.exponentBase < 1) {
          newBase = 1.1;
        } else {
          // decreasing base
          newBase = 0.9;
        }
      }

      // enforce maximum of 215 times the prize fund
      if (newBase > maxBase(prevState.fundsAvailable))
        newBase = maxBase(prevState.fundsAvailable);

      // fix y-axis shift, if need be
      let newYAxisShift = prevState.yAxisShift;
      if (newYAxisShift < minYAxisShift(newBase)) {
        newYAxisShift = minYAxisShift(newBase);
      }

      return {
        ...prevState,
        exponentBase: newBase,
        yAxisShift: newYAxisShift,
      };
    });
  };

  const formFieldYAxisShiftChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCalcParams((prevState) => {
      let newYAxisShift = Number.parseFloat(event.target.value);

      // enforce minimum of -1/Base
      if (newYAxisShift < minYAxisShift(prevState.exponentBase))
        newYAxisShift = minYAxisShift(prevState.exponentBase);

      return {
        ...prevState,
        yAxisShift: newYAxisShift,
      };
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
