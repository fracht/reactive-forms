import { act, renderHook } from '@testing-library/react-hooks';

import { FormConfig, FormHelpers, useForm } from '../../src';

describe('useForm', () => {
    it('should pass helpers into onSubmit', async () => {
        const initialValues = {
            test: 'asdf'
        };

        const onSubmit = jest.fn(async (initialValues, helpers: FormHelpers<{ test: string }>) => {
            expect(initialValues).toStrictEqual(initialValues);
            expect(helpers).toBeDefined();
            expect(await helpers.validateField('test', '')).toStrictEqual({ $error: 'Required' });
            expect(await helpers.validateField('test', 'hello')).toBeUndefined();
            expect(await helpers.validateForm({ test: '' })).toStrictEqual({ test: { $error: 'Required' } });
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

    test('should call onValidationFailed function', () => {
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
            validateForm: () => formErrors,
            shouldValidatePureFields: true
        };

        const { result } = renderHook(() => useForm(config));

        act(() => {
            result.current.submit();
        });

        expect(onSubmit).toBeCalledTimes(0);
    });
});
