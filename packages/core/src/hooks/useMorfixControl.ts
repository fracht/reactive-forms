import { useCallback } from 'react';
import { Stock, useStock } from 'stocked';

import { META_KEY_ERRORS, META_KEY_GLOBAL_META, META_KEY_TOUCHED } from '../constants';
import { FieldError } from '../typings/FieldError';
import { FormMeta } from '../typings/FormMeta';
import { MorfixMeta } from '../typings/MorfixMeta';
import { FieldTouched } from '../typings/MorfixTouched';
import { joinPaths } from '../utils/joinPaths';

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

    values: Stock<Values>;
    formMeta: Stock<MorfixMeta<Values>>;
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
    const formMeta = useStock<MorfixMeta<Values>>({
        initialValues: {
            [META_KEY_GLOBAL_META]: initialFormMeta,
            [META_KEY_ERRORS]: initialErrors,
            [META_KEY_TOUCHED]: initialTouched
        }
    });

    const setFormMeta = useCallback(
        (path: keyof FormMeta, value: unknown) => formMeta.setValue(joinPaths(META_KEY_GLOBAL_META, path), value),
        [formMeta]
    );
    const getFormMeta = useCallback(
        <V>(path: keyof FormMeta) => formMeta.getValue<V>(joinPaths(META_KEY_GLOBAL_META, path)),
        [formMeta]
    );

    const setFieldValue = useCallback(<V>(name: string, value: V) => values.setValue(name, value), [values]);
    const getFieldValue = useCallback(<V>(name: string) => values.getValue<V>(name), [values]);
    const setValues = useCallback((newValues: Values) => values.setValues(newValues), [values]);

    const setFieldTouched = useCallback(
        <V>(name: string, touched: FieldTouched<V> | undefined) =>
            formMeta.setValue(joinPaths(META_KEY_TOUCHED, name), touched),
        [formMeta]
    );
    const getFieldTouched = useCallback(
        <V>(name: string) => formMeta.getValue<FieldTouched<V>>(joinPaths(META_KEY_TOUCHED, name)),
        [formMeta]
    );
    const setTouched = useCallback(
        (touched: FieldTouched<Values>) => formMeta.setValue(META_KEY_TOUCHED, touched),
        [formMeta]
    );

    const setFieldError = useCallback(
        <V>(name: string, error: FieldError<V> | undefined) =>
            formMeta.setValue(joinPaths(META_KEY_ERRORS, name), error),
        [formMeta]
    );
    const getFieldError = useCallback(
        <V>(name: string) => formMeta.getValue<FieldError<V>>(joinPaths(META_KEY_ERRORS, name)),
        [formMeta]
    );
    const setErrors = useCallback(
        (errors: FieldError<Values>) => formMeta.setValue(META_KEY_ERRORS, errors),
        [formMeta]
    );

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
        values
    };
};
