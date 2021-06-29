import { act, renderHook } from '@testing-library/react-hooks';

import { MorfixConfig, MorfixHelpers, useMorfix } from '../../src';

describe('useMorfix', () => {
    it('should pass morfixHelpers into onSubmit', async () => {
        const initialValues = {
            test: 'asdf'
        };

        const onSubmit = jest.fn(async (initialValues, morfixHelpers: MorfixHelpers<{ test: string }>) => {
            expect(initialValues).toStrictEqual(initialValues);
            expect(morfixHelpers).toBeDefined();
            expect(await morfixHelpers.validateField('test', '')).toStrictEqual({ mrfxError: 'Required' });
            expect(await morfixHelpers.validateField('test', 'hello')).toBeUndefined();
            expect(await morfixHelpers.validateForm({ test: '' })).toStrictEqual({ test: { mrfxError: 'Required' } });
        });

        const { result } = renderHook(() =>
            useMorfix({
                initialValues,
                onSubmit
            })
        );

        await act(async () => {
            result.current.registerValidator('test', (value: string) => {
                if (value.length === 0) {
                    return {
                        mrfxError: 'Required'
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
                mrfxError: 'error message'
            }
        };

        const onSubmit = jest.fn();

        const config: MorfixConfig<{ test: string }> = {
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

        const { result } = renderHook(() => useMorfix(config));

        act(() => {
            result.current.submit();
        });

        expect(onSubmit).toBeCalledTimes(0);
    });
});
