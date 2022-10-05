import { createContext } from 'react';
import { GuardianInformationStore } from './GuardianInformationStore';

export const StoreContext = createContext<GuardianInformationStore>(
  (undefined as unknown) as GuardianInformationStore,
);
