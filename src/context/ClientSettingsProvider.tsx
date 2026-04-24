import { type FC, type ReactNode } from 'react';
import { type Theme } from '@mui/material';

import { createContext, useState } from 'react';
import {
  createTheme,
  ThemeProvider as ThemeProviderMui,
  useMediaQuery,
} from '@mui/material';

// context type
export interface clientSettingsContextType {
  themeIsDarkMode: boolean;
  toggleThemeIsDarkMode: () => void;
}

// create theme context
const ClientSettingsContext = createContext<clientSettingsContextType>({
  themeIsDarkMode: false,
  toggleThemeIsDarkMode: () => {
    /*no-op*/
  },
});

// props type
interface clientSettingsProviderType {
  children: ReactNode;
}

// Theme Provider component
const ClientSettingsProvider: FC<clientSettingsProviderType> = ({
  children,
}) => {
  // THEME
  // calculate initial theme
  let initialThemeIsDarkMode = false;
  const userPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const localStorageThemeDarkMode: string | null =
    localStorage.getItem('theme_dark_mode');

  // if storage is set, use it
  if (localStorageThemeDarkMode !== null) {
    initialThemeIsDarkMode = localStorageThemeDarkMode === 'true';
  } else {
    // if storage is not set, use media query
    initialThemeIsDarkMode = userPrefersDark;
  }

  // create themeIsDarkMode state
  const [themeIsDarkMode, setThemeIsDarkMode] = useState<boolean>(
    initialThemeIsDarkMode,
  );

  // toggle themeIsDarkMode
  const toggleThemeIsDarkMode = (): void => {
    setThemeIsDarkMode((prevState) => {
      // reverse prior state
      const newState = !prevState;

      localStorage.setItem('theme_dark_mode', newState.toString());
      return newState;
    });
  };

  // create theme
  const theme: Theme = createTheme({
    palette: {
      mode: themeIsDarkMode ? 'dark' : 'light',
    },
  });
  // THEME -- end

  return (
    <ClientSettingsContext
      value={{
        themeIsDarkMode,
        toggleThemeIsDarkMode,
      }}
    >
      <ThemeProviderMui theme={theme}>{children}</ThemeProviderMui>
    </ClientSettingsContext>
  );
};

// exports
export { ClientSettingsContext, ClientSettingsProvider };
