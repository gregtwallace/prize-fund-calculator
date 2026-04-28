import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { ClientSettingsProvider } from './context/ClientSettingsProvider';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import Calculator from './components/Calculator/Calculator';

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
        <Content>
          <Calculator />
        </Content>
        <Footer />
      </Box>
    </ClientSettingsProvider>
  );
};

export default App;
