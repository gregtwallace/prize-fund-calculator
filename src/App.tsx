import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { ClientSettingsProvider } from './context/ClientSettingsProvider';

import Header from './components/Main/Header/Header';
import Footer from './components/Main/Footer/Footer';
import Calculator from './components/Main/Calculator/Calculator';

const App = () => {
  return (
    <ClientSettingsProvider>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Header />
        <Box
          component='main'
          sx={{
            minHeight: 0,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Calculator />
        </Box>
        <Footer />
      </Box>
    </ClientSettingsProvider>
  );
};

export default App;
