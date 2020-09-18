import { useRef, useState } from 'react';
import { MorfixConfig } from './Morfix';
import {
    MorfixValues,
    MorfixShared,
    MorfixErrors,
    FieldValidator,
    ValidationRegistry
} from './types';
import { get, set } from 'lodash';
import { MORFIX_ERROR_PATH } from './constants';

export const useMorfix = <Values extends MorfixValues>({
    initialValues
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<MorfixErrors<Values>>({});

    const registry = useRef<ValidationRegistry>({});

    const validateField = async <V>(name: string, value?: V) => {
        if (Object.prototype.hasOwnProperty.call(registry.current, name)) {
            const error = await registry.current[name](
                value === undefined ? get(values, name) : value
            );
            setErrors({
                ...set(
                    errors,
                    name.trim().length > 0
                        ? `${name}.${MORFIX_ERROR_PATH}`
                        : MORFIX_ERROR_PATH,
                    error
                )
            });
            return error;
        }
        return undefined;
    };

    const setFieldValue = <T>(name: string, value: T) => {
        setValues({ ...set(values, name, value) });
        validateField(name, value);
    };

    const registerFieldValidator = <V>(
        name: string,
        validator: FieldValidator<V>
    ) => {
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
