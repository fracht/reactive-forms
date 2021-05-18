import { createContext } from 'react';

import { MorfixShared } from '../hooks/useMorfix';

export type MorfixContextType<Values extends object> = MorfixShared<Values>;

export const MorfixContext = createContext<MorfixContextType<object> | undefined>(undefined);

export const MorfixProvider = MorfixContext.Provider;

export const MorfixConsumer = MorfixContext.Consumer;
