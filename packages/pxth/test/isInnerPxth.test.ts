import { describe, expect, it } from 'vitest';

import { createPxth, isInnerPxth } from '../src';

describe('isInnerPxth', () => {
	it('should return false when path is not inner', () => {
		expect(isInnerPxth(createPxth(['hello']), createPxth(['b']))).toBe(false);
		expect(isInnerPxth(createPxth(['hello']), createPxth(['helloa']))).toBe(false);
		expect(isInnerPxth(createPxth(['.']), createPxth(['..']))).toBe(false);
		expect(isInnerPxth(createPxth(['hello']), createPxth(['hello.']))).toBe(false);
		expect(isInnerPxth(createPxth(['hello', 'asdf']), createPxth(['hello', 'a']))).toBe(false);
		expect(isInnerPxth(createPxth(['hello', 'asdf']), createPxth(['hello.asdf']))).toBe(false);

		// same paths
		expect(isInnerPxth(createPxth([]), createPxth([]))).toBe(false);
		expect(isInnerPxth(createPxth(['a']), createPxth(['a']))).toBe(false);
	});

	it('should return true when path is inner', () => {
		expect(isInnerPxth(createPxth(['hello']), createPxth(['hello', 'asdf']))).toBe(true);
		expect(isInnerPxth(createPxth(['hello']), createPxth(['hello', 'asdf', 'asdf']))).toBe(true);
		expect(isInnerPxth(createPxth(['hello']), createPxth(['hello', 'hello', 'hello']))).toBe(true);
		expect(isInnerPxth(createPxth(['..']), createPxth(['..', 'hello', '.']))).toBe(true);
	});

	it('should return true when path is deeply inner', () => {
		expect(
			isInnerPxth(createPxth(['hello', 'asdf', 'bsdf']), createPxth(['hello', 'asdf', 'bsdf', 'lol', 'k', 'w'])),
		).toBe(true);
		expect(
			isInnerPxth(createPxth(['hello', '0', 'bsdf']), createPxth(['hello', '0', 'bsdf', 'lol', 'k', 'w'])),
		).toBe(true);
		expect(isInnerPxth(createPxth(['...', '..', '.']), createPxth(['...', '..', '.', '@,', '$', '*&^']))).toBe(
			true,
		);
	});
});
