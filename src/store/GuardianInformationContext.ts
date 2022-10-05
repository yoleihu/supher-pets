import { createContext } from 'react';
import { GuardianInformationStore } from './GuardianInformationStore';

export const GuardianStoreContext = createContext<GuardianInformationStore>(
  (undefined as unknown) as GuardianInformationStore,
);
