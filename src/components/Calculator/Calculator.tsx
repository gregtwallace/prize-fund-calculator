import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import type { inputFields } from './inputs.ts';

import PayChart from './PayChart';
import PayTable from './PayTable';

import { inputParamsDefault, inputConformation } from './inputs.ts';
import { generateResults } from './results-exponent.ts';

const Calculator = () => {
  // calcInputs are the values used for the current on screen calculated values
  const [calcInputs, setCalcInputs] = useState<inputFields>(inputParamsDefault);
  const calcResult = generateResults(calcInputs);

  // fieldParams holds the live input field values
  const [formFields, setFormFields] = useState<inputFields>(inputParamsDefault);

  // param handlers
  const formFieldFundsAvailableChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields((prevState) => ({
      ...prevState,
      fundsAvailable: event.target.value,
    }));
  };

  const formFieldPositionsPaidChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields((prevState) => ({
      ...prevState,
      positionsPaid: event.target.value,
    }));
  };

  const formFieldExponentBaseChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields((prevState) => ({
      ...prevState,
      exponentBase: event.target.value,
    }));
  };

  const formFieldYAxisShiftChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields((prevState) => ({
      ...prevState,
      yAxisShift: event.target.value,
    }));
  };

  // make fields valid after user changes input
  const formFieldOnBlurHandler = () => {
    setFormFields((prevState) => {
      const newVals = inputConformation(prevState);
      setCalcInputs(newVals);
      return newVals;
    });
  };

  return (
    <Container>
      <Box
        sx={{
          m: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          gap: 1,
        }}
      >
        <Box
          component={Paper}
          sx={{
            p: 2,
          }}
        >
          <TextField
            id='funds-available'
            name='funds-available'
            label='Total Funds Available'
            value={formFields.fundsAvailable}
            onBlur={formFieldOnBlurHandler}
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
            id='positions-paid'
            name='positions-paid'
            label='Positions Paid'
            value={formFields.positionsPaid}
            onBlur={formFieldOnBlurHandler}
            onChange={formFieldPositionsPaidChangeHandler}
            fullWidth
            variant='outlined'
            sx={{ my: 1 }}
          />

          <TextField
            id='exponent-base'
            name='exponent-base'
            label='Exponent Base'
            value={formFields.exponentBase}
            onBlur={formFieldOnBlurHandler}
            onChange={formFieldExponentBaseChangeHandler}
            fullWidth
            variant='outlined'
            sx={{ my: 1 }}
          />

          <TextField
            id='y-axis-shift'
            name='y-axis-shift'
            label='Y-Axis Shift'
            value={formFields.yAxisShift}
            onBlur={formFieldOnBlurHandler}
            onChange={formFieldYAxisShiftChangeHandler}
            fullWidth
            variant='outlined'
            sx={{ my: 1 }}
          />
        </Box>

        <PayChart data={calcResult} />
      </Box>

      <PayTable data={calcResult} />
    </Container>
  );
};

export default Calculator;
