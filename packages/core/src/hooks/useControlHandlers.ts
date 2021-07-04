import { useCallback } from 'react';
import { Stock } from 'stocked';

import { FieldError, FieldTouched } from '../typings';
import { FormMeta } from '../typings/FormMeta';

export type ControlHandlersConfig<Values extends object> = {
    values: Stock<Values>;
    errors: Stock<FieldError<Values>>;
    touched: Stock<FieldTouched<Values>>;
    formMeta: Stock<FormMeta>;
};

export type ControlHandlers<Values extends object> = {
    setFieldError: <V>(name: string, error: FieldError<V> | undefined) => void;
    setFieldTouched: <V>(name: string, touched: FieldTouched<V> | undefined) => void;
    setFieldValue: <V>(name: string, value: V) => void;
    setFormMeta: <V>(name: keyof FormMeta, value: V) => void;

    getFieldError: <V>(name: string) => FieldError<V> | undefined;
    getFieldTouched: <V>(name: string) => FieldTouched<V> | undefined;
    getFieldValue: <V>(name: string) => V | undefined;
    getFormMeta: <V>(name: keyof FormMeta) => V;

    setErrors: (error: FieldError<Values>) => void;
    setTouched: (touched: FieldTouched<Values>) => void;
    setValues: (values: Values) => void;
};

export const useControlHandlers = <Values extends object>({
    values,
    errors,
    touched,
    formMeta
}: ControlHandlersConfig<Values>): ControlHandlers<Values> => {
    const setFormMeta = useCallback(
        (path: keyof FormMeta, value: unknown) => formMeta.setValue(path, value),
        [formMeta]
    );
    const getFormMeta = useCallback(<V>(path: keyof FormMeta) => formMeta.getValue<V>(path), [formMeta]);

    const setFieldValue = useCallback(<V>(name: string, value: V) => values.setValue(name, value), [values]);
    const getFieldValue = useCallback(<V>(name: string) => values.getValue<V>(name), [values]);
    const setValues = useCallback((newValues: Values) => values.setValues(newValues), [values]);

    const setFieldTouched = useCallback(
        <V>(name: string, fieldTouched: FieldTouched<V> | undefined) => touched.setValue(name, fieldTouched),
        [touched]
    );
    const getFieldTouched = useCallback(<V>(name: string) => touched.getValue<FieldTouched<V>>(name), [touched]);
    const setTouched = useCallback((allTouched: FieldTouched<Values>) => touched.setValues(allTouched), [touched]);

    const setFieldError = useCallback(
        <V>(name: string, error: FieldError<V> | undefined) => errors.setValue(name, error),
        [errors]
    );
    const getFieldError = useCallback(<V>(name: string) => errors.getValue<FieldError<V>>(name), [errors]);
    const setErrors = useCallback((allErrors: FieldError<Values>) => errors.setValues(allErrors), [errors]);

    return {
        setFormMeta,
        getFormMeta,
        setFieldValue,
        getFieldValue,
        setValues,
        setFieldTouched,
        getFieldTouched,
        setTouched,
        setFieldError,
        getFieldError,
        setErrors
    };
};
