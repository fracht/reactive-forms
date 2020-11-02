import { useCallback } from 'react';
import set from 'lodash/set';

import { FieldContextConfig, useDefaultFieldContext } from './useDefaultFieldContext';
import { MorfixErrors, MorfixTouched } from '../typings';

export type ObjectFieldConfig<V extends object> = {} & FieldContextConfig<V>;

export type ObjectFieldProps<V extends object> = {
    values: V;
    setValues: (value: V) => void;
    setTouched: (touched: MorfixTouched<V>) => void;
    setErrors: (errors: MorfixErrors<V>) => void;
    setDeepValue: <T>(path: string, value: T) => void;
    setDeepTouched: <T>(path: string, touched: MorfixTouched<T>) => void;
    setDeepError: <T>(path: string, error: MorfixErrors<T>) => void;
    errors?: MorfixErrors<V>;
    touched?: MorfixTouched<V>;
};

export const useObjectField = <V extends object>(contextConfig: ObjectFieldConfig<V>): ObjectFieldProps<V> => {
    const {
        value: values,
        control: { setValue: setValues, setTouched, setError: setErrors },
        meta: { error: errors, touched }
    } = useDefaultFieldContext(contextConfig);

    const setDeepValue = useCallback(<T>(path: string, value: T) => setValues(set(values, path, value)), [
        setValues,
        values
    ]);

    const setDeepTouched = useCallback(
        <T>(path: string, newTouched: MorfixTouched<T>) =>
            setTouched(set(touched ?? ({} as MorfixTouched<V>), path, newTouched)),
        [setTouched, touched]
    );

    const setDeepError = useCallback(
        <T>(path: string, error: MorfixErrors<T>) => setErrors(set(errors ?? ({} as MorfixErrors<V>), path, error)),
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
