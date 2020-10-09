import { useCallback, useEffect } from 'react';
import get from 'lodash/get';

import { runYupSchema } from './utils/runYupSchema';
import { safeMerge } from './utils/safeMerge';
import { useMorfixContext } from './MorfixContext';
import { FieldContext, FieldError, SharedFieldConfig } from './types';

export const useDefaultFieldContext = <V>({
    name,
    validate: validateFn,
    validationSchema
}: SharedFieldConfig<V>): FieldContext<V> => {
    const {
        values,
        errors,
        initialValues,
        setFieldValue,
        registerFieldValidator,
        unregisterFieldValidator
    } = useMorfixContext();

    const validate = useCallback(
        async (value: V) => {
            const fnErrors = await validateFn?.(value);
            const yupErrors = validationSchema && (await runYupSchema(validationSchema, value));
            return safeMerge(fnErrors, yupErrors) as FieldError;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [validateFn, validationSchema]
    );

    useEffect(() => {
        if (validate) registerFieldValidator(name, validate);
        return () => unregisterFieldValidator(name);
    }, [validate, name, registerFieldValidator, unregisterFieldValidator]);

    const setValue = useCallback((value: unknown) => setFieldValue(name, value), [name, setFieldValue]);

    return [
        {
            value: get(values, name),
            initialValue: get(initialValues, name),
            error: get(errors, name)
        },
        { setValue }
    ];
};
