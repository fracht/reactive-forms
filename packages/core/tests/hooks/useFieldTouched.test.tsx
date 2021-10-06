import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Dispatch } from 'stocked';

import { FieldTouched, FormConfig, FormShared, ReactiveFormProvider, useFieldTouched, useForm } from '../../src';

const renderFieldTouched = <V, T extends object>(
    name: string,
    config: FormConfig<T>
): RenderHookResult<undefined, [FieldTouched<V>, Dispatch<FieldTouched<V>>]> => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config));

    const wrapper = ({ children }) => (
        <ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{() => children}</ReactiveFormProvider>
    );

    return renderHook(() => useFieldTouched<V>(name), { wrapper });
};

describe('useFieldTouched', () => {
    it('should return current touched', () => {
        const { result: result1 } = renderFieldTouched('hello', {
            initialValues: {
                hello: 'asd'
            },
            initialTouched: {
                hello: {
                    $touched: true
                }
            }
        });

        expect(result1.current[0]).toStrictEqual({
            $touched: true
        });

        const { result: result2 } = renderFieldTouched('user.name', {
            initialValues: {
                user: {
                    name: 'Hello'
                }
            },
            initialTouched: {
                user: {
                    $touched: true,
                    name: {
                        $touched: false
                    }
                }
            }
        });

        expect(result2.current[0]).toStrictEqual({
            $touched: false
        });

        const { result: result3 } = renderFieldTouched('user', {
            initialValues: {
                user: {
                    name: 'Hello'
                }
            },
            initialTouched: {
                user: {
                    $touched: true,
                    name: {
                        $touched: false
                    }
                }
            }
        });

        expect(result3.current[0]).toStrictEqual({
            $touched: true,
            name: {
                $touched: false
            }
        });
    });

    it('should modify touched', () => {
        const { result, rerender } = renderFieldTouched('hello', {
            initialValues: {
                hello: 'asd'
            },
            initialTouched: {
                hello: {
                    $touched: true
                }
            }
        });

        expect(result.current[0]).toStrictEqual({
            $touched: true
        });

        act(() => {
            result.current[1]({ $touched: false });
            rerender();
        });

        expect(result.current[0]).toStrictEqual({
            $touched: false
        });
    });
});
