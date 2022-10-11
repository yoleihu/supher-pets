import { createContext } from 'react';
import { BloodCenterInformationStore } from './BloodCenterInformationStore';

export const BloodCenterStoreContext = createContext<BloodCenterInformationStore>(
  (undefined as unknown) as BloodCenterInformationStore,
);
