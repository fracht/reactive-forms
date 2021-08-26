import { act, renderHook } from '@testing-library/react-hooks';

import { FieldError, FormConfig, FormHelpers, useForm } from '../../src';

describe('useForm', () => {
    it('should pass helpers into onSubmit', async () => {
        const initialValues = {
            test: 'asdf'
        };

        const onSubmit = jest.fn(async (initialValues, helpers: FormHelpers<{ test: string }>) => {
            expect(initialValues).toStrictEqual(initialValues);
            expect(helpers).toBeDefined();
            expect(await helpers.validateField('test', '')).toStrictEqual({ $error: 'Required' });
            expect(await helpers.validateField('test', 'hello')).toStrictEqual({ $error: undefined });
            expect(await helpers.validateField('testt', 'aaaa')).toBeUndefined();
            expect(await helpers.validateForm({ test: '' })).toStrictEqual({
                test: { $error: 'Required' }
            });
        });

        const { result } = renderHook(() =>
            useForm({
                initialValues,
                onSubmit
            })
        );

        await act(async () => {
            result.current.registerValidator('test', (value: string) => {
                if (value.length === 0) {
                    return {
                        $error: 'Required'
                    };
                }

                return undefined;
            });

            await result.current.submit();
        });

        expect(onSubmit).toBeCalled();
    });

    it('should call onValidationFailed function', async () => {
        const formErrors = {
            test: {
                $error: 'error message'
            }
        };

        const onSubmit = jest.fn();

        const config: FormConfig<{ test: string }> = {
            initialValues: {
                test: 'hello'
            },
            onSubmit,
            onValidationFailed: (errors) => {
                expect(errors).toStrictEqual(formErrors);
            },
            validateForm: () => formErrors
        };

        const { result } = renderHook(() => useForm(config));

        await act(async () => {
            await result.current.submit();
        });

        expect(onSubmit).toBeCalledTimes(0);
    });

    describe('should merge errors correctly', () => {
        it('should merge errors attached to arrays', async () => {
            const onSubmit = jest.fn();

            const { result } = renderHook(() =>
                useForm({
                    initialValues: {
                        arr: [[]]
                    },
                    validateForm: (values) => {
                        if (values.arr[0].length === 0) {
                            const arrError: FieldError<string[][]> = [];
                            const innerError: FieldError<string[]> = [];

                            arrError.$error = 'Error';
                            innerError.$error = 'Inner error';

                            arrError.push(innerError);

                            return {
                                arr: arrError
                            };
                        }

                        return {};
                    },
                    onSubmit
                })
            );

            await act(async () => {
                await result.current.submit();
            });

            expect(result.current.getFieldError('arr').$error).toBe('Error');
            expect(result.current.getFieldError('arr.0').$error).toBe('Inner error');
            expect(onSubmit).toBeCalledTimes(0);
        });
    });
});
