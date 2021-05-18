import { useCallback } from 'react';
import set from 'lodash/set';

import { FieldConfig, useField } from './useField';
import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/MorfixTouched';

export type ObjectFieldConfig<V extends object> = {} & FieldConfig<V>;

export type ObjectFieldProps<V extends object> = {
    values: V;
    setValues: (value: V) => void;
    setTouched: (touched: FieldTouched<V>) => void;
    setErrors: (errors: FieldError<V>) => void;
    setDeepValue: <T>(path: string, value: T) => void;
    setDeepTouched: <T>(path: string, touched: FieldTouched<T>) => void;
    setDeepError: <T>(path: string, error: FieldError<T>) => void;
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
        <T>(path: string, value: T) => setValues(set(values, path, value)),
        [setValues, values]
    );

    const setDeepTouched = useCallback(
        <T>(path: string, newTouched: FieldTouched<T>) =>
            setTouched(set(touched ?? ({} as FieldTouched<V>), path, newTouched)),
        [setTouched, touched]
    );

    const setDeepError = useCallback(
        <T>(path: string, error: FieldError<T>) => setErrors(set(errors ?? ({} as FieldError<V>), path, error)),
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
