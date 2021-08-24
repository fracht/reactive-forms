import { act, renderHook } from '@testing-library/react-hooks';

import { FormConfig, FormHelpers, useForm } from '../../src';

describe('validateField', () => {
    it('should run field-level validation', async () => {
        const { result } = renderHook(() =>
            useForm({
                initialValues: {}
            })
        );

        const validator = jest.fn();
        validator.mockReturnValueOnce('error');

        let cleanup;

        act(() => {
            cleanup = result.current.registerValidator('custom.name', validator);
        });

        await expect(result.current.validateField('custom.name', { value: 'asdf' })).resolves.toStrictEqual({
            $error: 'error'
        });

        expect(validator).toBeCalledWith({
            value: 'asdf'
        });

        validator.mockClear();
        validator.mockReturnValueOnce({ $error: 'newError' });

        await expect(result.current.validateField('custom.name', {})).resolves.toStrictEqual({
            $error: 'newError'
        });

        validator.mockClear();
        validator.mockReturnValueOnce(null);

        await expect(result.current.validateField('custom.name', {})).resolves.toStrictEqual({
            $error: undefined
        });

        act(() => {
            cleanup();
        });
    });

    it('should return undefined, but not modify errors, if validator is not defined', async () => {
        const { result } = renderHook(() =>
            useForm({
                initialValues: {
                    custom: {
                        name: 'User'
                    }
                },
                initialErrors: {
                    custom: {
                        name: {
                            $error: 'Error'
                        }
                    }
                }
            })
        );

        await expect(result.current.validateField('custom.name', 0)).resolves.toBe(undefined);

        expect(result.current.getFieldError('custom.name')).toStrictEqual({ $error: 'Error' });
    });

    it('should return undefined and clear error if validator returned nothing', async () => {
        const { result } = renderHook(() =>
            useForm({
                initialValues: {
                    custom: {
                        name: 'User'
                    }
                },
                initialErrors: {
                    custom: {
                        name: {
                            $error: 'Error'
                        }
                    }
                }
            })
        );

        let cleanup;

        const validator = jest.fn();

        act(() => {
            cleanup = result.current.registerValidator('custom.name', validator);
        });

        await expect(result.current.validateField('custom.name', 0)).resolves.toBe(undefined);

        expect(result.current.getFieldError('custom.name')).toStrictEqual(undefined);
    });
});

// describe('useForm', () => {

//     it('should pass helpers into onSubmit', async () => {
//         const initialValues = {
//             test: 'asdf'
//         };

//         const onSubmit = jest.fn(async (initialValues, helpers: FormHelpers<{ test: string }>) => {
//             expect(initialValues).toStrictEqual(initialValues);
//             expect(helpers).toBeDefined();
//             expect(await helpers.validateField('test', '')).toStrictEqual({ $error: 'Required' });
//             expect(await helpers.validateField('test', 'hello')).toStrictEqual({ $error: undefined });
//             expect(await helpers.validateField('testt', 'aaaa')).toBeUndefined();
//             expect(await helpers.validateForm({ test: '' })).toStrictEqual({
//                 test: { $error: 'Required' }
//             });
//         });

//         const { result } = renderHook(() =>
//             useForm({
//                 initialValues,
//                 onSubmit
//             })
//         );

//         await act(async () => {
//             result.current.registerValidator('test', (value: string) => {
//                 if (value.length === 0) {
//                     return {
//                         $error: 'Required'
//                     };
//                 }

//                 return undefined;
//             });

//             await result.current.submit();
//         });

//         expect(onSubmit).toBeCalled();
//     });

//     test('should call onValidationFailed function', () => {
//         const formErrors = {
//             test: {
//                 $error: 'error message'
//             }
//         };

//         const onSubmit = jest.fn();

//         const config: FormConfig<{ test: string }> = {
//             initialValues: {
//                 test: 'hello'
//             },
//             onSubmit,
//             onValidationFailed: (errors) => {
//                 expect(errors).toStrictEqual(formErrors);
//             },
//             validateForm: () => formErrors
//         };

//         const { result } = renderHook(() => useForm(config));

//         act(() => {
//             result.current.submit();
//         });

//         expect(onSubmit).toBeCalledTimes(0);
//     });
// });
