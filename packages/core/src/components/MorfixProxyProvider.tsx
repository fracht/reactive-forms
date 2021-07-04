import React, { PropsWithChildren } from 'react';
import { StockProxy, useStockContext } from 'stocked';

import { MorfixContext } from './MorfixContext';
import { useControlHandlers } from '../hooks/useControlHandlers';
import { useMorfixContext } from '../hooks/useMorfixContext';

export type MorfixProxyProviderProps = PropsWithChildren<{
    proxy: StockProxy;
}>;

export const MorfixProxyProvider = ({ proxy, children }: MorfixProxyProviderProps) => {
    const { values, errors, touched, formMeta, ...other } = useMorfixContext();

    const newValues = useStockContext(values, proxy);
    const newErrors = useStockContext(errors, proxy);
    const newTouched = useStockContext(touched, proxy);

    const handlers = useControlHandlers({ values: newValues, errors: newErrors, touched: newTouched, formMeta });

    return (
        <MorfixContext.Provider
            value={{
                ...other,
                ...handlers,
                formMeta,
                values: newValues,
                errors: newErrors,
                touched: newTouched
            }}
        >
            {children}
        </MorfixContext.Provider>
    );
};
