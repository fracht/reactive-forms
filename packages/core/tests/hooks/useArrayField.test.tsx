import React from 'react';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { ArrayFieldProps, FormConfig, FormShared, ReactiveFormProvider, useArrayField, useForm } from '../../src';

const renderArrayField = <T extends object>(
    name: string,
    config: FormConfig<T>
): RenderHookResult<undefined, ArrayFieldProps<T>> => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config));

    const wrapper = ({ children }) => (
        <ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{() => children}</ReactiveFormProvider>
    );

    return renderHook(() => useArrayField<T>({ name }), { wrapper });
};

describe('useArrayField', () => {
    it('should return items', () => {
        const { result } = renderArrayField('arr', {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        expect(result.current.items).toStrictEqual([0, 1, 2]);
    });
});
