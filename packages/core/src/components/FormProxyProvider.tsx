import React, { createContext, useCallback } from 'react';
import { Pxth } from 'pxth';
import { intercept, StockProxy, useStockContext } from 'stocked';

import { FormContext } from './FormContext';
import { useControlHandlers } from '../hooks/useControlHandlers';
import { useFormContext } from '../hooks/useFormContext';
import { FieldValidator } from '../typings/FieldValidator';

export type FormProxyProviderProps<V> = {
    proxy: StockProxy<V>;
    children: React.ReactNode | ((path: Pxth<V>) => React.ReactNode);
};

export const FormProxyContext = createContext<StockProxy<unknown> | undefined>(undefined);

export const FormProxyProvider = <V,>({ proxy, children }: FormProxyProviderProps<V>) => {
    const { values, errors, touched, formMeta, registerValidator, ...other } = useFormContext();

    const newValues = useStockContext(values, proxy as StockProxy<unknown>);
    const newErrors = useStockContext(errors, proxy as StockProxy<unknown>);
    const newTouched = useStockContext(touched, proxy as StockProxy<unknown>);

    const handlers = useControlHandlers({ values: newValues, errors: newErrors, touched: newTouched, formMeta });

    const { getFieldValue } = handlers;

    const interceptedRegisterValidator = useCallback(
        <V,>(name: Pxth<V>, validator: FieldValidator<V>) =>
            intercept(
                proxy as StockProxy<unknown>,
                name as Pxth<unknown>,
                registerValidator,
                (name, validator) => {
                    return registerValidator(proxy.getNormalPath(name), () => validator(getFieldValue(name)!));
                },
                [name as Pxth<unknown>, validator as FieldValidator<unknown>]
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
            <FormProxyContext.Provider value={proxy as StockProxy<unknown>}>
                {typeof children === 'function' ? children(proxy.path) : children}
            </FormProxyContext.Provider>
        </FormContext.Provider>
    );
};
