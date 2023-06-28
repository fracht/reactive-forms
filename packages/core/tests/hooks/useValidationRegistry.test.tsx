import { renderHook } from '@testing-library/react';
import { createPxth } from 'pxth';

import { FieldError, FieldInnerError } from '../../src';
import { useValidationRegistry } from '../../src/hooks/useValidationRegistry';

const renderUseValidationRegistry = () => {
	return renderHook(() => useValidationRegistry());
};

describe('useValidationRegistry', () => {
	it('Should call registered validator', async () => {
		const { result } = renderUseValidationRegistry();

		const validator = jest.fn(() => {
			return 'some error';
		});
		const path = createPxth<string>(['path']);
		const unregister = result.current.registerValidator(path, validator);

		const error = await result.current.validateField(path, 'asdf');

		expect(validator).toBeCalledTimes(1);
		expect(validator).toBeCalledWith('asdf');
		expect(error?.$error).toBe('some error');

		unregister();
	});

	it('Should set an error returned from upper-level field validator', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			child: string;
		};

		const rootPath = createPxth<TestValues>([]);
		const childPath = rootPath.child;

		const rootValidator = jest.fn(() => ({ child: { $error: 'error' } }));
		const childValidator = jest.fn(() => undefined);

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(rootPath, { child: 'test' });

		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			child: {
				$error: 'error',
			},
		});

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should set an error returned from lower-level field validator', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			child: string;
		};

		const rootPath = createPxth<TestValues>([]);
		const childPath = rootPath.child;

		const rootValidator = jest.fn(() => ({ child: { $error: undefined } }));
		const childValidator = jest.fn(() => 'error');

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(rootPath, { child: 'test' });

		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			$error: undefined,
			child: {
				$error: 'error',
			},
		});

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should override an error returned from upper-level field validator', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			child: string;
		};

		const rootPath = createPxth<TestValues>([]);
		const childPath = rootPath.child;

		const rootValidator = jest.fn(() => ({ child: { $error: 'hello' } }));
		const childValidator = jest.fn(() => ({ $error: 'error' }));

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(rootPath, { child: 'test' });

		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			child: {
				$error: 'error',
			},
		});

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should merge errors from different validators', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			child: {
				someValue: string;
			};
		};

		const rootPath = createPxth<TestValues>([]);
		const childPath = rootPath.child;

		const rootValidator = jest.fn(() => ({ child: { someValue: { $error: 'error' } } }));
		const childValidator = jest.fn(() => ({ $error: 'something' }));

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(rootPath, { child: { someValue: '' } });

		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			child: {
				$error: 'something',
				someValue: {
					$error: 'error',
				},
			},
		});

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should return correct error for an array', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			array: string[];
		};

		const rootPath = createPxth<TestValues>([]);
		const childPath = rootPath.array;

		const rootValidator = jest.fn(() => {
			const error: FieldInnerError[] & FieldInnerError = [];
			error.$error = 'error';
			return { array: error };
		});
		const childValidator = jest.fn(() => undefined);

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(rootPath, { array: [] });

		const expectedError: FieldInnerError[] & FieldInnerError = [];
		expectedError.$error = 'error';
		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			array: expectedError,
		});

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should return correct error for an array element', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			array: string[];
		};

		const rootPath = createPxth<TestValues>([]);
		const childPath = rootPath.array[0];

		const rootValidator = jest.fn(() => ({ array: [{ $error: 'error' }] }));
		const childValidator = jest.fn(() => undefined);

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(rootPath, { array: [] });

		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			array: [{ $error: 'error' }],
		});

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('#1: Should return correct error if multiple validators are registered for the same field', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			value: string;
		};

		const valuePath = createPxth<string>(['value']);

		const firstValidator = jest.fn(() => ({ $error: undefined, value: { $error: null } }));
		const secondValidator = jest.fn(() => ({ $error: 'error' }));

		const unregisterFirst = result.current.registerValidator(valuePath, firstValidator);
		const unregisterSecond = result.current.registerValidator(valuePath, secondValidator);

		const output = await result.current.validateBranch(valuePath, 'test');

		expect(firstValidator).toBeCalledTimes(1);
		expect(secondValidator).toBeCalledTimes(1);
		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			value: {
				$error: 'error',
			},
		});

		unregisterFirst();
		unregisterSecond();
	});

	it('#2: Should return correct error if multiple validators are registered for the same field', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			value: string;
		};

		const valuePath = createPxth<string>(['value']);

		const firstValidator = jest.fn(() => ({ $error: 'error' }));
		const secondValidator = jest.fn(() => ({ $error: 'another' }));

		const unregisterFirst = result.current.registerValidator(valuePath, firstValidator);
		const unregisterSecond = result.current.registerValidator(valuePath, secondValidator);

		const output = await result.current.validateBranch(valuePath, 'test');

		expect(firstValidator).toBeCalledTimes(1);
		expect(secondValidator).toBeCalledTimes(0);
		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			value: {
				$error: 'error',
			},
		});

		unregisterFirst();
		unregisterSecond();
	});
});
