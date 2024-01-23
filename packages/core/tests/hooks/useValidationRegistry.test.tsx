import { renderHook } from '@testing-library/react';
import { createPxth, getPxthSegments } from 'pxth';

import { FieldError, FieldInnerError } from '../../src';
import { useValidationRegistry } from '../../src/hooks/useValidationRegistry';

const renderUseValidationRegistry = () => {
	return renderHook(() => useValidationRegistry());
};

describe('useValidationRegistry', () => {
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

		expect(getPxthSegments(output.attachPath)).toStrictEqual([]);

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

		expect(getPxthSegments(output.attachPath)).toStrictEqual([]);

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should merge (not override) errors from multiple validators on the same field (with objects)', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			a: string;
			b: string;
		};

		const path = createPxth<TestValues>([]);

		const firstValidator = jest.fn(() => ({ a: { $error: undefined }, b: { $error: 'error' } }));
		const secondValidator = jest.fn(() => ({ a: { $error: 'error' }, b: { $error: 'override' } }));
		const thirdValidator = jest.fn(() => ({ $error: 'test', a: { $error: 'override' } }));

		const unregisterFirst = result.current.registerValidator(path, firstValidator);
		const unregisterSecond = result.current.registerValidator(path, secondValidator);
		const unregisterThird = result.current.registerValidator(path, thirdValidator);

		const output = await result.current.validateBranch(path, { a: 'test', b: 'test' });

		expect(firstValidator).toBeCalledTimes(1);
		expect(secondValidator).toBeCalledTimes(1);
		expect(thirdValidator).toBeCalledTimes(1);
		expect(output.errors as FieldError<TestValues>).toStrictEqual({
			$error: 'test',
			a: {
				$error: 'error',
			},
			b: {
				$error: 'error',
			},
		});

		expect(getPxthSegments(output.attachPath)).toStrictEqual([]);

		expect(await result.current.validateAllFields({ a: 'test', b: 'test' })).toStrictEqual({
			$error: 'test',
			a: {
				$error: 'error',
			},
			b: {
				$error: 'error',
			},
		});

		unregisterFirst();
		unregisterSecond();
		unregisterThird();
	});

	it('Should merge (not override) errors from multiple validators on the same field (with primitives)', async () => {
		const { result } = renderUseValidationRegistry();

		const path = createPxth<{}>([]);

		const firstValidator = jest.fn(() => null);
		const secondValidator = jest.fn(() => 'error');
		const thirdValidator = jest.fn(() => 'override');

		const unregisterFirst = result.current.registerValidator(path, firstValidator);
		const unregisterSecond = result.current.registerValidator(path, secondValidator);
		const unregisterThird = result.current.registerValidator(path, thirdValidator);

		const output = await result.current.validateBranch(path, {});

		expect(firstValidator).toBeCalledTimes(1);
		expect(secondValidator).toBeCalledTimes(1);
		expect(thirdValidator).toBeCalledTimes(1);
		expect(output.errors as FieldError<{}>).toStrictEqual({
			$error: 'error',
		});

		expect(getPxthSegments(output.attachPath)).toStrictEqual([]);

		expect(await result.current.validateAllFields({})).toStrictEqual({
			$error: 'error',
		});

		unregisterFirst();
		unregisterSecond();
		unregisterThird();
	});

	it('Should return correct attachPath', async () => {
		const { result } = renderUseValidationRegistry();

		type TestValues = {
			a: {
				b: string;
			};
		};

		const rootPath = createPxth<TestValues['a']>(['a']);
		const childPath = rootPath.b;

		const rootValidator = jest.fn(() => ({ $error: 'error' }));
		const childValidator = jest.fn(() => undefined);

		const unregisterRootValidator = result.current.registerValidator(rootPath, rootValidator);
		const unregisterChildValidator = result.current.registerValidator(childPath, childValidator);

		const output = await result.current.validateBranch(childPath, { value: 'hello' });

		expect(getPxthSegments(output.attachPath)).toStrictEqual(['a']);

		unregisterRootValidator();
		unregisterChildValidator();
	});

	it('Should merge error, set on array, with array items errors', async () => {
		const { result } = renderUseValidationRegistry();
		type TestType = { array: unknown[] };
		const path = createPxth<{ array: unknown[] }>([]);

		const arrayValidator = jest.fn(() => 'arrayError');
		const arrayItemValidator = jest.fn(() => 'itemError');

		const unregisterArrayItemValidator = result.current.registerValidator(path.array[0], arrayItemValidator);
		const unregisterArrayValidator = result.current.registerValidator(path.array, arrayValidator);

		const errors = (await result.current.validateBranch(path, {})).errors as FieldError<TestType>;

		expect(errors.array?.$error).toStrictEqual('arrayError');
		expect(errors.array?.[0]).toStrictEqual({ $error: 'itemError' });

		unregisterArrayValidator();
		unregisterArrayItemValidator();
	});
});
