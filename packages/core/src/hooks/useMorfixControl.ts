import { useCallback } from 'react';
import { Stock, useStock } from 'stocked';

import { META_KEY_ERRORS, META_KEY_GLOBAL_META, META_KEY_TOUCHED } from '../constants';
import { MorfixErrors } from '../typings/MorfixErrors';
import { MorfixFormMeta } from '../typings/MorfixFormMeta';
import { MorfixMeta } from '../typings/MorfixMeta';
import { MorfixTouched } from '../typings/MorfixTouched';
import { joinPaths } from '../utils/joinPaths';

export type MorfixControl<Values extends object> = {
    setFieldError: <V>(name: string, error: MorfixErrors<V> | undefined) => void;
    setFieldTouched: <V>(name: string, touched: MorfixTouched<V> | undefined) => void;
    setFieldValue: <V>(name: string, value: V) => void;
    setFormMeta: <V>(name: keyof MorfixFormMeta, value: V) => void;

    getFieldError: <V>(name: string) => MorfixErrors<V> | undefined;
    getFieldTouched: <V>(name: string) => MorfixTouched<V> | undefined;
    getFieldValue: <V>(name: string) => V | undefined;
    getFormMeta: <V>(name: keyof MorfixFormMeta) => V;

    setErrors: (error: MorfixErrors<Values>) => void;
    setTouched: (touched: MorfixTouched<Values>) => void;
    setValues: (values: Values) => void;

    values: Stock<Values>;
    formMeta: Stock<MorfixMeta<Values>>;
};

export type MorfixControlConfig<Values extends object> = {
    initialValues: Values;
    initialErrors: MorfixErrors<Values>;
    initialTouched: MorfixTouched<Values>;
};

const initialFormMeta: MorfixFormMeta = {
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
        (path: keyof MorfixFormMeta, value: unknown) => formMeta.setValue(joinPaths(META_KEY_GLOBAL_META, path), value),
        [formMeta]
    );
    const getFormMeta = useCallback(
        <V>(path: keyof MorfixFormMeta) => formMeta.getValue<V>(joinPaths(META_KEY_GLOBAL_META, path)),
        [formMeta]
    );

    const setFieldValue = useCallback(<V>(name: string, value: V) => values.setValue(name, value), [values]);
    const getFieldValue = useCallback(<V>(name: string) => values.getValue<V>(name), [values]);
    const setValues = useCallback((newValues: Values) => values.setValues(newValues), [values]);

    const setFieldTouched = useCallback(
        <V>(name: string, touched: MorfixTouched<V> | undefined) =>
            formMeta.setValue(joinPaths(META_KEY_TOUCHED, name), touched),
        [formMeta]
    );
    const getFieldTouched = useCallback(
        <V>(name: string) => formMeta.getValue<MorfixTouched<V>>(joinPaths(META_KEY_TOUCHED, name)),
        [formMeta]
    );
    const setTouched = useCallback(
        (touched: MorfixTouched<Values>) => formMeta.setValue(META_KEY_TOUCHED, touched),
        [formMeta]
    );

    const setFieldError = useCallback(
        <V>(name: string, error: MorfixErrors<V> | undefined) =>
            formMeta.setValue(joinPaths(META_KEY_ERRORS, name), error),
        [formMeta]
    );
    const getFieldError = useCallback(
        <V>(name: string) => formMeta.getValue<MorfixErrors<V>>(joinPaths(META_KEY_ERRORS, name)),
        [formMeta]
    );
    const setErrors = useCallback(
        (errors: MorfixErrors<Values>) => formMeta.setValue(META_KEY_ERRORS, errors),
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
