import { isYupError } from '../../src/utils/isYupError';

describe('isYupError', () => {
	it('should return false', () => {
		expect(isYupError(null)).toBeFalsy();
		expect(isYupError()).toBeFalsy();
		expect(isYupError(void 0)).toBeFalsy();
		expect(isYupError('')).toBeFalsy();
		expect(isYupError([0, 1, 2])).toBeFalsy();
		expect(isYupError({})).toBeFalsy();
		expect(isYupError({ message: 'Aasdfasdf asdf!!!' })).toBeFalsy();
		expect(isYupError({ yup: true })).toBeFalsy();
	});
	it('should return true', () => {
		expect(isYupError({ name: 'ValidationError' })).toBeTruthy();
		expect(isYupError({ name: 'ValidationError', inner: [] })).toBeTruthy();
	});
});
