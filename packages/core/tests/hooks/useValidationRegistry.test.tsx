import { renderHook } from '@testing-library/react';
import { createPxth } from 'pxth';

import { FieldError, FieldInnerError } from '../../src';
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

		const path1 = createPxth<string>(['some', 'nested', 'path']);
		const validator1 = jest.fn(() => undefined);
		// const validator1 = jest.fn(() => 'error');
		const unregister1 = result.current.registerValidator(path1, validator1);

		const path2 = createPxth<{ path: string }>(['some', 'nested']);
		const validator2 = jest.fn(() => ({ path: { $error: 'error' } }));
		// const validator2 = jest.fn(() => undefined);
		const unregister2 = result.current.registerValidator(path2, validator2);

		const output = await result.current.validateBranch(path2, { path: 'test' });
		expect((output.errors as FieldError<{ some: { nested: { path: string } } }>).some?.nested?.path?.$error).toBe(
			'error',
		);

		unregister1();
		unregister2();
	});
});
