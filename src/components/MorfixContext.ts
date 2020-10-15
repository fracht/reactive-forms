import { createContext } from 'react';

import { MorfixStorageShared } from '../hooks';

export type MorfixContextType<Values> = MorfixStorageShared<Values>;

export const MorfixContext = createContext<MorfixContextType<unknown> | undefined>(undefined);

export const MorfixProvider = MorfixContext.Provider;

export const MorfixConsumer = MorfixContext.Consumer;
