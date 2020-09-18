import { useCallback, useEffect } from 'react';
import { useMorfixContext } from './MorfixContext';
import { FieldContext, SharedFieldConfig } from './types';
import { get } from 'lodash';

export const useDefaultFieldContext = <V>({
    name,
    validate
}: SharedFieldConfig<V>): FieldContext<V> => {
    const {
        values,
        initialValues,
        setFieldValue,
        registerFieldValidator,
        unregisterFieldValidator
    } = useMorfixContext();

    useEffect(() => {
        if (validate) registerFieldValidator(name, validate);
        return () => unregisterFieldValidator(name);
    }, []);

    const setValue = useCallback((value: V) => setFieldValue(name, value), [
        name
    ]);

    return [
        {
            value: get(values, name),
            initialValue: get(initialValues, name)
        },
        { setValue }
    ];
};
