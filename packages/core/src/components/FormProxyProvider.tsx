import React from 'react';
import { StockProxy, useStockContext } from 'stocked';

import { FormContext } from './FormContext';
import { useControlHandlers } from '../hooks/useControlHandlers';
import { useFormContext } from '../hooks/useFormContext';

export type FormProxyProviderProps = React.PropsWithChildren<{
    proxy: StockProxy;
}>;

export const FormProxyProvider = ({ proxy, children }: FormProxyProviderProps) => {
    const { values, errors, touched, formMeta, ...other } = useFormContext();

    const newValues = useStockContext(values, proxy);
    const newErrors = useStockContext(errors, proxy);
    const newTouched = useStockContext(touched, proxy);

    const handlers = useControlHandlers({ values: newValues, errors: newErrors, touched: newTouched, formMeta });

    return (
        <FormContext.Provider
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
        </FormContext.Provider>
    );
};
