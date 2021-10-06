import { Pxth } from 'pxth';
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
    setFieldError: <V>(name: Pxth<V>, error: SetStateAction<FieldError<V>>) => void;
    setFieldTouched: <V>(name: Pxth<V>, touched: SetStateAction<FieldTouched<V>>) => void;
    setFieldValue: <V>(name: Pxth<V>, value: SetStateAction<V>) => void;
    setFormMeta: <V>(name: Pxth<V>, value: SetStateAction<V>) => void;

    getFieldError: <V>(name: Pxth<V>) => FieldError<V>;
    getFieldTouched: <V>(name: Pxth<V>) => FieldTouched<V>;
    getFieldValue: <V>(name: Pxth<V>) => V;
    getFormMeta: <V>(name: Pxth<V>) => V;

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
        setFieldTouched: setFieldTouched as ControlHandlers<Values>['setFieldTouched'],
        getFieldTouched: getFieldTouched as ControlHandlers<Values>['getFieldTouched'],
        setTouched,
        setFieldError: setFieldError as ControlHandlers<Values>['setFieldError'],
        getFieldError: getFieldError as ControlHandlers<Values>['getFieldError'],
        setErrors
    };
};
