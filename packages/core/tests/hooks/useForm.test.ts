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

        await expect(result.current.validateField('custom.name', 0)).resolves.toStrictEqual({ $error: undefined });

        expect(validator).toBeCalled();
        expect(result.current.getFieldError('custom.name')).toStrictEqual({ $error: undefined });

        act(() => {
            cleanup();
        });
    });

    it('should clear error if disablePureFieldsValidation enabled & value is equal to initial value', async () => {
        const { result } = renderHook(() =>
            useForm({
                initialValues: {
                    custom: {
                        name: {
                            inner: {
                                value: 'a'
                            }
                        }
                    }
                },
                initialErrors: {
                    custom: {
                        name: {
                            $error: 'Error',
                            inner: {
                                $error: 'Error',
                                value: {
                                    $error: 'Error'
                                }
                            }
                        }
                    }
                },
                disablePureFieldsValidation: true
            })
        );

        let cleanup;

        const validator = jest.fn();

        act(() => {
            cleanup = result.current.registerValidator('custom.name', validator);
        });

        await expect(
            result.current.validateField('custom.name', {
                inner: {
                    value: 'a'
                }
            })
        ).resolves.toStrictEqual(undefined);

        expect(validator).not.toBeCalled();
        expect(result.current.getFieldError('custom.name')).toStrictEqual({ $error: undefined });

        act(() => {
            cleanup();
        });
    });
});

describe('validateForm', () => {
    it('should call all registered validators', async () => {
        const { result } = renderHook(() =>
            useForm({
                initialValues: {
                    hello: 'asdf',
                    deep: {
                        value: 'asdf'
                    },
                    array: ['asdf']
                }
            })
        );

        const validator1 = jest.fn();
        const validator2 = jest.fn();
        const validator3 = jest.fn();
        const validator4 = jest.fn();

        act(() => {
            result.current.registerValidator('hello', validator1);
            result.current.registerValidator('deep.value', validator2);
            result.current.registerValidator('array[1]', validator3);
            result.current.registerValidator('not.existing.value', validator4);
        });

        validator1.mockReturnValueOnce('Error1');
        validator2.mockReturnValueOnce(undefined);
        validator3.mockReturnValueOnce({ $error: 'Error2' });
        validator4.mockReturnValueOnce({ $error: 'Error3' });

        await expect(
            result.current.validateForm({
                hello: 'value1',
                deep: {
                    value: 'value2'
                },
                array: [undefined, 'value3']
            })
        ).resolves.toStrictEqual({
            hello: {
                $error: 'Error1'
            },
            array: [
                undefined,
                {
                    $error: 'Error2'
                }
            ],
            not: {
                existing: {
                    value: {
                        $error: 'Error3'
                    }
                }
            }
        });

        expect(validator1).toBeCalledWith('value1');
        expect(validator2).toBeCalledWith('value2');
        expect(validator3).toBeCalledWith('value3');
        expect(validator4).toBeCalledWith(undefined);
    });

    it('should run validateForm function', async () => {
        const validateForm = jest.fn();

        validateForm.mockReturnValueOnce({
            $error: null,
            value: {
                $error: 'New error!!!'
            }
        });

        const { result } = renderHook(() =>
            useForm({
                initialValues: {
                    value: 'asdf'
                },
                validateForm
            })
        );

        await expect(
            result.current.validateForm({
                value: 'New value'
            })
        ).resolves.toStrictEqual({
            value: {
                $error: 'New error!!!'
            }
        });

        expect(validateForm).toBeCalledWith({
            value: 'New value'
        });
    });

    it('should run validation schema', () => {
        const { result } = renderHook(() =>
            useForm({
                initialValues: {
                    value: 'asdf'
                }
            })
        );
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
