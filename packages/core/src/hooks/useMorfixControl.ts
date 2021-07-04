import { Stock, useStock } from 'stocked';

import { ControlHandlers, useControlHandlers } from './useControlHandlers';
import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/FieldTouched';
import { FormMeta } from '../typings/FormMeta';

export type MorfixControl<Values extends object> = {
    formMeta: Stock<FormMeta>;
    values: Stock<Values>;
    errors: Stock<FieldError<Values>>;
    touched: Stock<FieldTouched<Values>>;
} & ControlHandlers<Values>;

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

    const handlers = useControlHandlers({ values, errors, touched, formMeta });

    return {
        ...handlers,

        formMeta,
        errors,
        touched,
        values
    };
};
