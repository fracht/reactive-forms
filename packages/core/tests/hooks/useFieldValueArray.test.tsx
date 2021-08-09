import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';

import {
    FieldValueArrayConfig,
    FormConfig,
    FormShared,
    ReactiveFormProvider,
    useFieldValueArray,
    useForm
} from '../../src';

const renderFieldValueArray = <V extends object, T extends object>(
    paths: FieldValueArrayConfig<V>,
    config: FormConfig<T>
): [RenderHookResult<undefined, V>, FormShared<T>] => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config));

    const wrapper = ({ children }) => (
        <ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{() => children}</ReactiveFormProvider>
    );

    return [renderHook(() => useFieldValueArray<V>(paths), { wrapper }), bag];
};

describe('useField', () => {
    it('should return object of specified values', () => {
        const [{ result }, { setFieldValue }] = renderFieldValueArray(
            {
                a: 'hello',
                b: 'b.c.e',
                c: 'd'
            },
            {
                initialValues: {
                    hello: 'asdf',
                    b: {
                        c: {
                            e: 'bbbb'
                        }
                    },
                    d: {
                        a: 'hello'
                    }
                }
            }
        );

        expect(result.current).toStrictEqual({
            a: 'asdf',
            b: 'bbbb',
            c: {
                a: 'hello'
            }
        });

        act(() => {
            setFieldValue('hello', 'asdfasdf');
            setFieldValue('b.c', { e: 'ggg' });
            setFieldValue('d.c.d', 'aa');
        });

        expect(result.current).toStrictEqual({
            a: 'asdfasdf',
            b: 'ggg',
            c: {
                a: 'hello',
                c: {
                    d: 'aa'
                }
            }
        });
    });
});
