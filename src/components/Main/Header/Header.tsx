import { type FC } from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

// no props

// component
const Header: FC = () => {
  return (
    <AppBar
      sx={{ position: 'relative', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant='dense'>
        <Typography component='h1' variant='h6' sx={{ flexGrow: 1 }}>
          Prize Fund Calculator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
