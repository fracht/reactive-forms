import { useCallback } from 'react';
import { FormShared, Plugin } from '@reactive-forms/core';

export const domPlugin: Plugin = {
    token: Symbol.for('dom'),
    useDecorator: <T extends object>(shared: FormShared<T>) => {
        const { setFieldValue, setFieldTouched } = shared;

        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(e.target.name, e.target.value);
            },
            [setFieldValue]
        );

        const handleBlur = useCallback(
            (e: React.FocusEvent<HTMLInputElement>) => {
                setFieldTouched(e.target.name, {
                    $touched: true
                });
            },
            [setFieldTouched]
        );

        return {
            ...shared,
            handleChange,
            handleBlur
        };
    }
};
