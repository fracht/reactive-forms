import { useEffect, useRef } from 'react';
import merge from 'lodash/merge';
import type { BaseSchema } from 'yup';

import { useFormContext } from './useFormContext';
import { FieldValidator } from '../typings/FieldValidator';
import { runYupSchema } from '../utils/runYupSchema';

export type UseFieldValidatorConfig<V> = FieldValidationProps<V> & { name: string };

export type FieldValidationProps<V> = {
    validator?: FieldValidator<V>;
    schema?: BaseSchema<Partial<V> | V | undefined>;
};

export const useFieldValidator = <V>({ name, validator: validatorFn, schema }: UseFieldValidatorConfig<V>) => {
    const { registerValidator } = useFormContext();

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

        return registerValidator(name, validator);
    }, [name, registerValidator]);
};
