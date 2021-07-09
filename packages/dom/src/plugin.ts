import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { MorfixShared, Plugin } from '@morf1x/core';

export const domPlugin = (): Plugin => ({
    token: Symbol.for('dom'),
    useDecorator: <T extends object>(shared: MorfixShared<T>) => {
        const { setFieldValue, setFieldTouched } = shared;

        const handleChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setFieldValue(e.target.name, e.target.value);
            },
            [setFieldValue]
        );

        const handleBlur = useCallback(
            (e: FocusEvent<HTMLInputElement>) => {
                setFieldTouched(e.target.name, {
                    mrfxTouched: true
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
});
