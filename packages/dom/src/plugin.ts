import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { FormShared, Plugin } from '@reactive-forms/core';

import { TextInputElement } from './TextInputElement';

export const domPlugin: Plugin = {
    token: Symbol.for('dom'),
    useDecorator: <T extends object>(shared: FormShared<T>) => {
        const { setFieldValue, setFieldTouched } = shared;

        const handleChange = useCallback(
            (e: ChangeEvent<TextInputElement>) => {
                setFieldValue(e.target.name, e.target.value);
            },
            [setFieldValue]
        );

        const handleBlur = useCallback(
            (e: FocusEvent<TextInputElement>) => {
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
