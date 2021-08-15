import React, { createContext, PropsWithChildren, useCallback } from 'react';
import { intercept, StockProxy, useStockContext } from 'stocked';

import { FormContext } from './FormContext';
import { useControlHandlers } from '../hooks/useControlHandlers';
import { useFormContext } from '../hooks/useFormContext';
import { FieldValidator } from '../typings/FieldValidator';

export type FormProxyProviderProps = PropsWithChildren<{
    proxy: StockProxy;
}>;

export const FormProxyContext = createContext<StockProxy | undefined>(undefined);

export const FormProxyProvider = ({ proxy, children }: FormProxyProviderProps) => {
    const { values, errors, touched, formMeta, registerValidator, ...other } = useFormContext();

    const { getFieldValue } = other;

    const newValues = useStockContext(values, proxy);
    const newErrors = useStockContext(errors, proxy);
    const newTouched = useStockContext(touched, proxy);

    const handlers = useControlHandlers({ values: newValues, errors: newErrors, touched: newTouched, formMeta });

    const interceptedRegisterValidator = useCallback(
        <V,>(name: string, validator: FieldValidator<V>) =>
            intercept(
                proxy,
                name,
                registerValidator,
                (name, validator) => {
                    return registerValidator(proxy.getNormalPath(name) as string, () =>
                        validator(proxy.getValue(name, getFieldValue(name)!))
                    );
                },
                [name, validator as FieldValidator<unknown>]
            ),
        [getFieldValue, proxy, registerValidator]
    );

    return (
        <FormContext.Provider
            value={{
                ...other,
                ...handlers,
                formMeta,
                values: newValues,
                errors: newErrors,
                touched: newTouched,
                registerValidator: interceptedRegisterValidator
            }}
        >
            <FormProxyContext.Provider value={proxy}>{children}</FormProxyContext.Provider>
        </FormContext.Provider>
    );
};
