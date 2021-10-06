import { useCallback } from 'react';
import { deepSet, Pxth } from 'pxth';

import { FieldConfig, useField } from './useField';
import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/FieldTouched';

export type ObjectFieldConfig<V extends object> = {} & FieldConfig<V>;

export type ObjectFieldProps<V extends object> = {
    values: V;
    setValues: (value: V) => void;
    setTouched: (touched: FieldTouched<V>) => void;
    setErrors: (errors: FieldError<V>) => void;
    setDeepValue: <T>(path: Pxth<T>, value: T) => void;
    setDeepTouched: <T>(path: Pxth<T>, touched: FieldTouched<T>) => void;
    setDeepError: <T>(path: Pxth<T>, error: FieldError<T>) => void;
    errors?: FieldError<V>;
    touched?: FieldTouched<V>;
};

export const useObjectField = <V extends object>(contextConfig: ObjectFieldConfig<V>): ObjectFieldProps<V> => {
    const {
        value: values,
        control: { setValue: setValues, setTouched, setError: setErrors },
        meta: { error: errors, touched }
    } = useField(contextConfig);

    const setDeepValue = useCallback(
        <T>(path: Pxth<T>, value: T) => setValues(deepSet(values, path, value) as V),
        [setValues, values]
    );

    const setDeepTouched = useCallback(
        <T>(path: Pxth<T>, newTouched: FieldTouched<T>) =>
            setTouched(
                deepSet(touched ?? ({} as FieldTouched<V>), path, newTouched as unknown as T) as FieldTouched<V>
            ),
        [setTouched, touched]
    );

    const setDeepError = useCallback(
        <T>(path: Pxth<T>, error: FieldError<T>) =>
            setErrors(deepSet(errors ?? ({} as FieldError<V>), path, error as unknown as T) as FieldError<V>),
        [errors, setErrors]
    );

    return {
        values,
        errors,
        touched,
        setValues,
        setErrors,
        setTouched,
        setDeepError,
        setDeepTouched,
        setDeepValue
    };
};
