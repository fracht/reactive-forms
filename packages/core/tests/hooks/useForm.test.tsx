import { act, renderHook } from '@testing-library/react';
import { createPxth, Pxth } from 'pxth';
import { Stock } from 'stocked';

import { FieldError, useForm } from '../../src';

const waitForStockValueUpdate = (stock: Stock<object>, path: Pxth<unknown>) => {
	return new Promise<void>((resolve, reject) => {
		const timeout = setTimeout(() => reject(new Error('Time-out - field update took longer than 1 second')), 1000);
		const watchCleanup = stock.watch(path, () => {
			clearTimeout(timeout);
			resolve();
			watchCleanup();
		});
	});
};

describe('validateUpdatedFields', () => {
	it('should run field-level validations when field value changes', async () => {
		const { result } = renderHook(() =>
			useForm({
				initialValues: {},
			}),
		);

		const somePxth = createPxth(['some', 'deep', 'path']);

		const validator = jest.fn();
		validator.mockReturnValue('error');

		const cleanup = result.current.registerValidator(somePxth, validator);
		result.current.setFieldValue(somePxth, 'asdf');

		await waitForStockValueUpdate(result.current.errors, somePxth);

		expect(result.current.getFieldError(somePxth)).toStrictEqual({
			$error: 'error',
		});

		act(() => {
			cleanup();
		});
	});
	it('should run field-level validations when parent value changes', async () => {
		const { result } = renderHook(() =>
			useForm({
				initialValues: {},
			}),
		);

		const somePxth = createPxth(['some', 'deep', 'path']);

		const validator = jest.fn();
		validator.mockReturnValue('error');

		const cleanup = result.current.registerValidator(somePxth, validator);
		result.current.setFieldValue(createPxth(['some']), { deep: { path: 'asdf' } });

		await waitForStockValueUpdate(result.current.errors, somePxth);

		expect(result.current.getFieldError(somePxth)).toStrictEqual({
			$error: 'error',
		});

		act(() => {
			cleanup();
		});
	});
});

describe('validateField', () => {
	it('should run field-level validation', async () => {
		type TestValues = {
			value: string;
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					value: 'test',
				},
			}),
		);

		const valuePath = result.current.paths.value;

		const validator = jest.fn();
		validator.mockReturnValueOnce('error');

		const unregisterValidator = result.current.registerValidator(valuePath, validator);

		await expect(result.current.validateField(valuePath, 'asdf')).resolves.toStrictEqual({
			$error: 'error',
		});

		expect(validator).toBeCalledWith('asdf');

		validator.mockClear();
		validator.mockReturnValueOnce({ $error: 'newError' });

		await expect(result.current.validateField(valuePath, 'asdf')).resolves.toStrictEqual({
			$error: 'newError',
		});

		validator.mockClear();
		validator.mockReturnValueOnce(null);

		await expect(result.current.validateField(valuePath, 'asdf')).resolves.toStrictEqual({
			$error: undefined,
		});

		unregisterValidator();
	});

	it('should return undefined when there are no validators attached', async () => {
		type TestValues = {
			name: string;
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					name: 'User',
				},
			}),
		);

		const valuePath = result.current.paths.name;

		await expect(result.current.validateField(valuePath, 'asdf')).resolves.toBe(undefined);
	});

	it('should return undefined if validator returned nothing', async () => {
		type TestValues = {
			name: string;
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					name: 'User',
				},
			}),
		);

		const valuePath = result.current.paths.name;

		const validator = jest.fn();

		const unregisterValidator = result.current.registerValidator(valuePath, validator);

		await expect(result.current.validateField(valuePath, 'asdf')).resolves.toStrictEqual({
			$error: undefined,
		});

		expect(validator).toBeCalled();

		unregisterValidator();
	});

	it('should discard an error from validator for pure field', async () => {
		type TestValues = {
			value: string;
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					value: 'a',
				},
				disablePureFieldsValidation: true,
			}),
		);

		const valuePath = result.current.paths.value;
		const validator = jest.fn(() => ({ $error: 'some error' }));

		const unregisterValidator = result.current.registerValidator(valuePath, validator);

		await expect(result.current.validateField(valuePath, 'a')).resolves.toStrictEqual({ $error: undefined });

		expect(validator).toBeCalled();

		unregisterValidator();
	});

	it('should call validators for the whole branch and discard other errors', async () => {
		type TestValues = {
			name: {
				first: string;
				second: string;
			};
			surname: string;
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					name: {
						first: 'a',
						second: 'b',
					},
					surname: 'b',
				},
			}),
		);

		const valuePath = result.current.paths.name;
		const objectPath = result.current.paths;

		const valueValidator = jest.fn(() => ({ $error: 'value error', first: { $error: 'nested error 1' } }));
		const objectValidator = jest.fn(() => ({
			$error: 'object error',
			surname: { $error: 'discarded error' },
			name: { second: { $error: 'nested error 2' }, first: { $error: 'hello' } },
		}));

		const unregisterValueValidator = result.current.registerValidator(valuePath, valueValidator);
		const unregisterObjectValidator = result.current.registerValidator(objectPath, objectValidator);

		await expect(result.current.validateField(valuePath)).resolves.toStrictEqual({
			$error: 'value error',
			first: {
				$error: 'nested error 1',
			},
			second: {
				$error: 'nested error 2',
			},
		});
		expect(valueValidator).toBeCalled();
		expect(objectValidator).toBeCalled();

		unregisterValueValidator();
		unregisterObjectValidator();
	});

	it('should exclude errors on pure fields with disablePureFieldsValidation option', async () => {
		type TestValues = {
			pure: string;
			dirty: string;
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					pure: 'a',
					dirty: 'b',
				},
				disablePureFieldsValidation: true,
			}),
		);

		const valuePath = result.current.paths;

		const validator = jest.fn(() => ({ pure: { $error: 'discarded' }, dirty: { $error: 'error' } }));

		const unregisterValidator = result.current.registerValidator(valuePath, validator);

		await expect(
			result.current.validateField(valuePath, {
				pure: 'a',
				dirty: 'c',
			}),
		).resolves.toStrictEqual({
			dirty: {
				$error: 'error',
			},
			pure: {
				$error: undefined,
			},
		});

		expect(validator).toBeCalled();

		unregisterValidator();
	});

	it('should call validators for whole branch from origin field (with arrays)', async () => {
		type TestValues = {
			array: { value: string }[];
		};

		const { result } = renderHook(() =>
			useForm<TestValues>({
				initialValues: {
					array: [{ value: 'hello' }],
				},
			}),
		);

		const arrayPath = result.current.paths.array;
		const valuePath = arrayPath[0];

		const validator = jest.fn(() => ({ value: { $error: 'nested error' } }));
		const arrayValidator = jest.fn(() => [{ $error: 'other error' }]);

		const unregisterValidator = result.current.registerValidator(valuePath, validator);
		const unregisterArrayValidator = result.current.registerValidator(arrayPath, arrayValidator);

		await expect(result.current.validateField(valuePath)).resolves.toStrictEqual({
			$error: 'other error',
			value: {
				$error: 'nested error',
			},
		});

		expect(validator).toBeCalled();
		expect(arrayValidator).toBeCalled();

		unregisterValidator();
		unregisterArrayValidator();
	});
});

describe('validateForm', () => {
	it('should call all registered validators', async () => {
		const { result } = renderHook(() =>
			useForm({
				initialValues: {
					hello: 'asdf',
					deep: {
						value: 'asdf',
					},
					array: ['asdf'] as Array<undefined | string>,
				},
			}),
		);

		const validator1 = jest.fn();
		const validator2 = jest.fn();
		const validator3 = jest.fn();
		const validator4 = jest.fn();

		act(() => {
			result.current.registerValidator(createPxth(['hello']), validator1);
			result.current.registerValidator(createPxth(['deep', 'value']), validator2);
			result.current.registerValidator(createPxth(['array', '1']), validator3);
			result.current.registerValidator(createPxth(['not', 'existing', 'value']), validator4);
		});

		await act(async () => {
			await result.current.submit();
		});

		validator1.mockReturnValueOnce('Error1');
		validator2.mockReturnValueOnce(undefined);
		validator3.mockReturnValueOnce({ $error: 'Error2' });
		validator4.mockReturnValueOnce({ $error: 'Error3' });

		await expect(
			result.current.validateForm({
				hello: 'value1',
				deep: {
					value: 'value2',
				},
				array: [undefined, 'value3'],
			}),
		).resolves.toStrictEqual({
			hello: {
				$error: 'Error1',
			},
			array: [
				undefined,
				{
					$error: 'Error2',
				},
			],
			not: {
				existing: {
					value: {
						$error: 'Error3',
					},
				},
			},
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
				$error: 'New error!!!',
			},
		});

		const { result } = renderHook(() =>
			useForm({
				initialValues: {
					value: 'asdf',
				},
				validateForm,
			}),
		);

		await expect(
			result.current.validateForm({
				value: 'New value',
			}),
		).resolves.toStrictEqual({
			value: {
				$error: 'New error!!!',
			},
		});

		expect(validateForm).toBeCalledWith({
			value: 'New value',
		});
	});
});

describe('should merge errors correctly', () => {
	it('should merge errors attached to arrays', async () => {
		const onSubmit = jest.fn();

		const { result } = renderHook(() =>
			useForm<{ arr: unknown[][] }>({
				initialValues: {
					arr: [[]],
				},
				validateForm: (values) => {
					if (values.arr[0].length === 0) {
						const arrError: FieldError<string[][]> = [];
						const innerError: FieldError<string[]> = [];

						arrError.$error = 'Error';
						innerError.$error = 'Inner error';

						arrError.push(innerError);

						return {
							arr: arrError,
						};
					}

					return {};
				},
				onSubmit,
			}),
		);

		await act(async () => {
			await result.current.submit();
		});

		expect(result.current.getFieldError(createPxth(['arr'])).$error).toBe('Error');
		expect(result.current.getFieldError(createPxth(['arr', '0'])).$error).toBe('Inner error');
		expect(onSubmit).toBeCalledTimes(0);
	});

	it('should merge errors attached to arrays', async () => {
		const onSubmit = jest.fn();

		const { result } = renderHook(() =>
			useForm<{ load_models: unknown[] }>({
				initialValues: {
					load_models: [],
				},
				validateForm: (values) => {
					if (values.load_models.length === 0) {
						const arrError: FieldError<string[]> = [];

						arrError.$error = 'Error';

						return {
							load_models: arrError,
						};
					}

					return {};
				},
				onSubmit,
			}),
		);

		await act(async () => {
			await result.current.submit();
		});

		expect(result.current.getFieldError(createPxth(['load_models'])).$error).toBe('Error');
		expect(onSubmit).toBeCalledTimes(0);
	});

	it('Should merge error, set on array item in validateForm, with array error', async () => {
		const onSubmit = jest.fn();
		type ValueType = { emails: { email: string; checked: boolean }[] };

		const { result } = renderHook(() =>
			useForm<ValueType>({
				initialValues: {
					emails: [{ email: '', checked: false }],
				},
				validateForm: ({ emails }) => {
					const errors: FieldError<ValueType> = { emails: [] };
					for (let i = 0; i < emails.length; i++) {
						if (!emails[i].email) {
							errors.emails![i] = { email: { $error: 'EmailInvalid' } };
						}
					}
					return errors;
				},
				onSubmit,
			}),
		);

		const emailsPath = createPxth<ValueType['emails']>(['emails']);

		const emailsFieldValidator = jest.fn((value: ValueType['emails']) =>
			!value.some((email) => email.checked) ? 'ArrError' : '',
		);

		const unregisterEmailsValidator = result.current.registerValidator(emailsPath, emailsFieldValidator);

		await act(async () => {
			await result.current.submit();
		});

		expect(result.current.getFieldError(emailsPath).$error).toBe('ArrError');
		expect(result.current.getFieldError(createPxth(['emails', '0', 'email'])).$error).toBe('EmailInvalid');
		expect(onSubmit).toBeCalledTimes(0);

		unregisterEmailsValidator();
	});
});
