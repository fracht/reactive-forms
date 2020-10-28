import { useEffect, useRef } from 'react';
import merge from 'lodash/merge';
import { Schema } from 'yup';

import { useMorfixContext } from './useMorfixContext';
import { FieldValidator } from '../typings';
import { runYupSchema } from '../utils/runYupSchema';

export type UseFieldValidatorConfig<V> = FieldValidationProps<V> & { name: string };

export type FieldValidationProps<V> = {
    validator?: FieldValidator<V>;
    schema?: Schema<Partial<V> | V | undefined>;
};

export const useFieldValidator = <V>({ name, validator: validatorFn, schema }: UseFieldValidatorConfig<V>) => {
    const {
        validationRegistry: { registerValidator, unregisterValidator }
    } = useMorfixContext();

    const validate = async (value: V) => {
        if (!validatorFn && !schema) return undefined;

        const validatorErrors = await validatorFn?.(value);
        const schemaErrors = schema ? await runYupSchema(schema, value) : undefined;

        if (!schemaErrors) return validatorErrors;

        return merge(schemaErrors, validatorErrors);
    };

    const validateRef = useRef(validate);

    validateRef.current = validate;

    useEffect(() => {
        const validator = (value: V) => validateRef.current?.(value);

        registerValidator(name, validator);

        return () => unregisterValidator(name, validator);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, registerValidator, unregisterValidator]);
};
