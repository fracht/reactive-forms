import { useCallback } from 'react';
import { Stock, useStock } from 'stocked';

import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/FieldTouched';
import { FormMeta } from '../typings/FormMeta';

export type MorfixControl<Values extends object> = {
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

    formMeta: Stock<FormMeta>;
    values: Stock<Values>;
    errors: Stock<FieldError<Values>>;
    touched: Stock<FieldTouched<Values>>;
};

export type MorfixControlConfig<Values extends object> = {
    initialValues: Values;
    initialErrors: FieldError<Values>;
    initialTouched: FieldTouched<Values>;
};

const initialFormMeta: FormMeta = {
    dirty: false,
    isSubmitting: false,
    isValid: true,
    isValidating: false,
    submitCount: 0
};

export const useMorfixControl = <Values extends object>({
    initialValues,
    initialErrors,
    initialTouched
}: MorfixControlConfig<Values>): MorfixControl<Values> => {
    const values = useStock({ initialValues });
    const errors = useStock<FieldError<Values>>({ initialValues: initialErrors });
    const touched = useStock<FieldTouched<Values>>({ initialValues: initialTouched });
    const formMeta = useStock<FormMeta>({ initialValues: initialFormMeta });

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
        setFieldValue,
        setValues,
        setFieldTouched,
        setTouched,
        setFieldError,
        setErrors,

        getFieldValue,
        getFieldTouched,
        getFieldError,
        getFormMeta,

        formMeta,
        errors,
        touched,
        values
    };
};
