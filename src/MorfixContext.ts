import { createContext, useContext } from 'react';
import invariant from 'tiny-invariant';

import { MorfixStorageShared } from './MorfixStorage';

export type MorfixContextType = MorfixStorageShared;

const MorfixContext = createContext<MorfixContextType | undefined>(undefined);

export const MorfixProvider = MorfixContext.Provider;

export const MorfixConsumer = MorfixContext.Consumer;

export const useMorfixContext = (): MorfixContextType => {
    const context = useContext(MorfixContext);

    invariant(context, "You're trying to access MorfixContext outside <Morfix> tag");

    return context;
};
