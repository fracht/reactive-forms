import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Dispatch } from 'stocked';

import { FieldError, FormConfig, FormShared, ReactiveFormProvider, useFieldError, useForm } from '../../src';

const renderFieldError = <V, T extends object>(
    name: string,
    config: FormConfig<T>
): RenderHookResult<undefined, [FieldError<V>, Dispatch<FieldError<V>>]> => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config));

    const wrapper = ({ children }) => (
        <ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{() => children}</ReactiveFormProvider>
    );

    return renderHook(() => useFieldError<V>(name), { wrapper });
};

describe('useFieldError', () => {
    it('should return current error', () => {
        const { result: result1 } = renderFieldError('hello', {
            initialValues: {
                hello: 'asd'
            },
            initialErrors: {
                hello: {
                    $error: 'asdf'
                }
            }
        });

        expect(result1.current[0]).toStrictEqual({
            $error: 'asdf'
        });

        const { result: result2 } = renderFieldError('user.name', {
            initialValues: {
                user: {
                    name: 'Hello'
                }
            },
            initialErrors: {
                user: {
                    name: {
                        $error: 'errr'
                    }
                }
            }
        });

        expect(result2.current[0]).toStrictEqual({
            $error: 'errr'
        });

        const { result: result3 } = renderFieldError('user', {
            initialValues: {
                user: {
                    name: 'Hello'
                }
            },
            initialErrors: {
                user: {
                    name: {
                        $error: 'errr'
                    }
                }
            }
        });

        expect(result3.current[0]).toStrictEqual({
            name: {
                $error: 'errr'
            }
        });
    });

    it('should modify error', () => {
        const { result, rerender } = renderFieldError('hello', {
            initialValues: {
                hello: 'asd'
            },
            initialErrors: {
                hello: {
                    $error: 'asdf'
                }
            }
        });

        expect(result.current[0]).toStrictEqual({
            $error: 'asdf'
        });

        act(() => {
            result.current[1]({ $error: 'newError' });
            rerender();
        });

        expect(result.current[0]).toStrictEqual({
            $error: 'newError'
        });
    });
});
