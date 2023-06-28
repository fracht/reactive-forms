import { isEmptyValidatorOutput } from '../../src/utils/isEmptyValidatorOutput';

describe('Is empty error', () => {
	it('should return true for empty errors', () => {
		expect(isEmptyValidatorOutput(undefined)).toBe(true);
		expect(isEmptyValidatorOutput(null)).toBe(true);

		expect(isEmptyValidatorOutput({ $error: undefined })).toBe(true);

		type TestValues = {
			a: string;
		};
		expect(isEmptyValidatorOutput<TestValues>({ $error: undefined, a: { $error: undefined } })).toBe(true);
	});

	it('should return false for non-empty errors', () => {
		expect(isEmptyValidatorOutput('')).toBe(false);
		expect(isEmptyValidatorOutput('error')).toBe(false);
		expect(isEmptyValidatorOutput({ $error: 'asdf' })).toBe(false);

		type TestValues = {
			a: string;
		};
		expect(isEmptyValidatorOutput<TestValues>({ $error: undefined, a: { $error: 'error' } })).toBe(false);
	});
});
