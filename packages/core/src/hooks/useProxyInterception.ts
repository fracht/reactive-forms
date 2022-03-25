import { useCallback } from 'react';
import { deepGet, deepSet, Pxth, relativePxth } from 'pxth';
import { intercept, StockProxy, useStockContext } from 'stocked';

import { useControlHandlers } from './useControlHandlers';
import { FormShared } from './useForm';
import { useFormContext } from './useFormContext';
import { FieldInnerError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';
import { NestedObject } from '../typings/NestedObject';

export const useProxyInterception = <V>(proxy: StockProxy<V>): FormShared<object> => {
    const { values, errors, touched, formMeta, registerValidator, validateField, ...other } = useFormContext();

    const newValues = useStockContext(values, proxy as StockProxy<unknown>);
    const newErrors = useStockContext(errors, proxy as StockProxy<unknown>);
    const newTouched = useStockContext(touched, proxy as StockProxy<unknown>);

    const handlers = useControlHandlers({ values: newValues, errors: newErrors, touched: newTouched, formMeta });

    const interceptedRegisterValidator = useCallback(
        <V>(name: Pxth<V>, validator: FieldValidator<V>) =>
            intercept(
                proxy as StockProxy<unknown>,
                name as Pxth<unknown>,
                registerValidator,
                (name, validator) => {
                    const normalPath = proxy.getNormalPath(name);

                    return registerValidator(normalPath, (realValue) =>
                        validator(
                            proxy.getValue(name, <U>(path: Pxth<U>) =>
                                deepGet<U>(
                                    realValue,
                                    relativePxth(normalPath as Pxth<unknown>, path as Pxth<unknown>) as Pxth<U>
                                )
                            )
                        )
                    );
                },
                [name as Pxth<unknown>, validator as FieldValidator<unknown>]
            ),
        [proxy, registerValidator]
    );

    const interceptedValidateField = useCallback(
        <V>(name: Pxth<V>, value: V) =>
            intercept(
                proxy as StockProxy<unknown>,
                name as Pxth<unknown>,
                validateField,
                (name, proxiedValue) => {
                    let realValue: unknown = {};

                    const normalPath = proxy.getNormalPath(name as Pxth<unknown>);

                    proxy.setValue(name, proxiedValue, <U>(path: Pxth<U>, innerValue: U) => {
                        realValue = deepSet(
                            realValue as object,
                            relativePxth(normalPath, path as Pxth<unknown>),
                            innerValue
                        );
                    });

                    return validateField(normalPath, realValue);
                },
                [name as Pxth<unknown>, value]
            ),
        [proxy, validateField]
    );

    return {
        ...other,
        ...handlers,
        formMeta,
        values: newValues,
        errors: newErrors,
        touched: newTouched,
        registerValidator: interceptedRegisterValidator,
        validateField: interceptedValidateField as <V>(
            name: Pxth<V>,
            value: V
        ) => Promise<NestedObject<FieldInnerError, V> | undefined>
    };
};
