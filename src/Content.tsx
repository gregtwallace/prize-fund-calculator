import type { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

interface propsType {
  children: ReactNode;
}

const Content: FC<propsType> = (props: propsType) => {
  const { children } = props;

  return (
    <Box
      component='main'
      sx={{
        p: 3,
        flexGrow: 1,
        overflowX: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export default Content;
