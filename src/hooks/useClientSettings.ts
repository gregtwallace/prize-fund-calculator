import { type clientSettingsContextType } from '../context/ClientSettingsProvider';

import { use } from 'react';

import { ClientSettingsContext } from '../context/ClientSettingsProvider';

const useClientSettings = (): clientSettingsContextType => {
  return use(ClientSettingsContext);
};

export default useClientSettings;
