import { useCallback, useEffect } from 'react';
import get from 'lodash/get';

import { useMorfixContext } from './MorfixContext';
import { FieldContext, SharedFieldConfig } from './types';

export const useDefaultFieldContext = <V>({ name, validate }: SharedFieldConfig<V>): FieldContext<V> => {
    const {
        values,
        errors,
        initialValues,
        setFieldValue,
        registerFieldValidator,
        unregisterFieldValidator
    } = useMorfixContext();

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
