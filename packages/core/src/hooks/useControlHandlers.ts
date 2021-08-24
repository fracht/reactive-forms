import { SetStateAction, Stock } from 'stocked';

import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/FieldTouched';
import { FormMeta } from '../typings/FormMeta';

export type ControlHandlersConfig<Values extends object> = {
    values: Stock<Values>;
    errors: Stock<FieldError<Values>>;
    touched: Stock<FieldTouched<Values>>;
    formMeta: Stock<FormMeta>;
};

export type ControlHandlers<Values extends object> = {
    setFieldError: <V>(name: string, error: SetStateAction<FieldError<V> | undefined>) => void;
    setFieldTouched: <V>(name: string, touched: SetStateAction<FieldTouched<V> | undefined>) => void;
    setFieldValue: <V>(name: string, value: SetStateAction<V>) => void;
    setFormMeta: <V>(name: keyof FormMeta, value: SetStateAction<V>) => void;

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
    const { setValue: setFormMeta, getValue: getFormMeta } = formMeta;
    const { setValue: setFieldValue, getValue: getFieldValue, setValues } = values;
    const { setValue: setFieldTouched, getValue: getFieldTouched, setValues: setTouched } = touched;
    const { setValue: setFieldError, getValue: getFieldError, setValues: setErrors } = errors;

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
