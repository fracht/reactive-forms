import React, { PropsWithChildren } from 'react';

import { AutoSaveContext } from './internal/AutoSaveContext';
import { AutoSaveService } from './AutoSaveService';

export type AutoSaveServiceProviderProps<T> = PropsWithChildren<{
    service: AutoSaveService<T>;
}>;

export const AutoSaveServiceProvider = <T,>({ service, children }: AutoSaveServiceProviderProps<T>) => {
    return <AutoSaveContext.Provider value={service as AutoSaveService<unknown>}>{children}</AutoSaveContext.Provider>;
};
