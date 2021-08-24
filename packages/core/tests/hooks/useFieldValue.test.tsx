import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Dispatch } from 'stocked';

import { FormConfig, FormShared, ReactiveFormProvider, useFieldValue, useForm } from '../../src';

const renderFieldValue = <V, T extends object>(
    name: string,
    config: FormConfig<T>
): RenderHookResult<undefined, [V, Dispatch<V>]> => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config));

    const wrapper = ({ children }) => (
        <ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{() => children}</ReactiveFormProvider>
    );

    return renderHook(() => useFieldValue<V>(name), { wrapper });
};

describe('useFieldValue', () => {
    it('should return current value', () => {
        const { result: result1 } = renderFieldValue('hello', {
            initialValues: {
                hello: 'asd'
            }
        });

        expect(result1.current[0]).toBe('asd');

        const { result: result2 } = renderFieldValue('user.name', {
            initialValues: {
                user: {
                    name: 'Hello'
                }
            }
        });

        expect(result2.current[0]).toBe('Hello');

        const { result: result3 } = renderFieldValue('user', {
            initialValues: {
                user: {
                    name: 'Hello'
                }
            }
        });

        expect(result3.current[0]).toStrictEqual({
            name: 'Hello'
        });
    });

    it('should modify value', () => {
        const { result, rerender } = renderFieldValue('hello', {
            initialValues: {
                hello: 'asd'
            }
        });

        expect(result.current[0]).toStrictEqual('asd');

        act(() => {
            result.current[1]('newValue');
            rerender();
        });

        expect(result.current[0]).toStrictEqual('newValue');
    });
});
