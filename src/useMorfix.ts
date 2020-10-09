import { useRef, useState } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import invariant from 'tiny-invariant';

import { fieldNameToErrorPath } from './utils/fieldNameToErrorPath';
import { runYupSchema } from './utils/runYupSchema';
import { safeMerge } from './utils/safeMerge';
import { MorfixConfig } from './Morfix';
import {
    FieldValidator,
    MorfixControl,
    MorfixErrors,
    MorfixShared,
    MorfixValues,
    SubmitAction,
    ValidationRegistry
} from './types';

export const useMorfix = <Values extends MorfixValues>({
    initialValues,
    onSubmit,
    validationSchema
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<MorfixErrors<Values>>({});

    const registry = useRef<ValidationRegistry>({});

    const validateField = async <V>(name: string, value?: V) => {
        if (Object.prototype.hasOwnProperty.call(registry.current, name)) {
            const error = await registry.current[name](value === undefined ? get(values, name) : value);
            setErrors({
                ...set(errors, fieldNameToErrorPath(name), error)
            });
            return error;
        }
        return undefined;
    };

    const validateAllFields = async (values: Values) => {
        const fieldKeys = Object.keys(registry.current);
        const reducedErrors: MorfixErrors<Values> = {};
        for (let i = 0; i < fieldKeys.length; i++) {
            const fieldKey = fieldKeys[i];
            const error = await registry.current[fieldKey](get(values, fieldKey));
            if (error) {
                set(reducedErrors, fieldNameToErrorPath(fieldKey), error);
            }
        }

        return reducedErrors;
    };

    const runValidationSchema = async (values: Values): Promise<MorfixErrors<Values> | undefined> => {
        const errors = validationSchema && ((await runYupSchema(validationSchema, values)) as MorfixErrors<Values>);
        return errors;
    };

    const validateForm = async (values: Values) => {
        const registryErrors = await validateAllFields(values);
        const schemaErrors = await runValidationSchema(values);

        const combinedErrors = safeMerge(registryErrors, schemaErrors) as MorfixErrors<Values>;

        return combinedErrors;
    };

    const setFieldValue = <T>(name: string, value: T) => {
        setValues({ ...set(values, name, value) });
        validateField(name, value);
    };

    const registerFieldValidator = <V>(name: string, validator: FieldValidator<V>) => {
        registry.current[name] = validator as FieldValidator<unknown>;
    };

    const unregisterFieldValidator = (name: string) => {
        delete registry.current[name];
    };

    const control: MorfixControl<Values> = {
        setFieldValue,
        setValues,
        registerFieldValidator,
        unregisterFieldValidator,
        submitForm: async (submitAciton?: SubmitAction<Values>) => {
            const normalSubmit = submitAciton ?? onSubmit;

            invariant(
                normalSubmit,
                "You're trying to call submitForm() without specifying action, when default Morfix submit action is not set."
            );

            const newErrors = await validateForm(values);

            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                normalSubmit(values, control);
            }
        }
    };

    return {
        values,
        initialValues,
        errors,
        ...control
    };
};
