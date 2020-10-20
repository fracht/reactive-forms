import { createContext } from 'react';

import { MorfixShared } from '../hooks';

export type MorfixContextType<Values> = MorfixShared<Values>;

export const MorfixContext = createContext<MorfixContextType<unknown> | undefined>(undefined);

export const MorfixProvider = MorfixContext.Provider;

export const MorfixConsumer = MorfixContext.Consumer;
