import { createContext } from 'react';

import { MorfixStorageShared } from '../hooks';

export type MorfixContextType = MorfixStorageShared;

export const MorfixContext = createContext<MorfixContextType | undefined>(undefined);

export const MorfixProvider = MorfixContext.Provider;

export const MorfixConsumer = MorfixContext.Consumer;
