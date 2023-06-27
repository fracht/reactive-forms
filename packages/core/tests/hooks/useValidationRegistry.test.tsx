import { renderHook } from '@testing-library/react';
import { createPxth } from 'pxth';

import { FieldError } from '../../src';
import { useValidationRegistry } from '../../src/hooks/useValidationRegistry';

const renderUseValidationRegistry = () => {
	return renderHook(() => useValidationRegistry());
};

describe('useValidationRegistry', () => {
	it('should call registered validator', async () => {
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

	it('should set an error returned from upper field', async () => {
		const { result } = renderUseValidationRegistry();

		const nestedPath = createPxth<string>(['some', 'nested', 'path']);
		const nestedPathValidator = jest.fn(() => undefined); // Called second
		const unregisterNestedPath = result.current.registerValidator(nestedPath, nestedPathValidator);

		const path = createPxth<{ path: string }>(['some', 'nested']);
		const validator = jest.fn(() => ({ path: { $error: 'error' } })); // Called first
		const unregister = result.current.registerValidator(path, validator);

		const output = await result.current.validateBranch(path, { path: 'test' });

		expect((output.errors as FieldError<{ some: { nested: { path: string } } }>).some?.nested?.path?.$error).toBe(
			'error',
		);

		unregisterNestedPath();
		unregister();
	});
});
