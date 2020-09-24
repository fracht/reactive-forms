import { useRef, useState } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

import { MORFIX_ERROR_PATH } from './constants';
import { MorfixConfig } from './Morfix';
import { FieldValidator, MorfixErrors, MorfixShared, MorfixValues, ValidationRegistry } from './types';

export const useMorfix = <Values extends MorfixValues>({
    initialValues
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<MorfixErrors<Values>>({});

    const registry = useRef<ValidationRegistry>({});

    const validateField = async <V>(name: string, value?: V) => {
        if (Object.prototype.hasOwnProperty.call(registry.current, name)) {
            const error = await registry.current[name](value === undefined ? get(values, name) : value);
            setErrors({
                ...set(errors, name.trim().length > 0 ? `${name}.${MORFIX_ERROR_PATH}` : MORFIX_ERROR_PATH, error)
            });
            return error;
        }
        return undefined;
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

    return {
        values,
        setValues,
        setFieldValue,
        initialValues,
        errors,
        registerFieldValidator,
        unregisterFieldValidator
    };
};
