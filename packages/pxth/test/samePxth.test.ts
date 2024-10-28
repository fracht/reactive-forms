import { describe, expect, it } from 'vitest';

import { createPxth, samePxth } from '../src';

describe('samePxth', () => {
	it('should return true when 2 paths are the same', () => {
		expect(samePxth(createPxth([]), createPxth([]))).toBeTruthy();
		expect(samePxth(createPxth(['a', 'b']), createPxth(['a', 'b']))).toBeTruthy();
		expect(samePxth(createPxth(['']), createPxth(['']))).toBeTruthy();
		expect(samePxth(createPxth([' / ', '.', '']), createPxth([' / ', '.', '']))).toBeTruthy();
		expect(samePxth(createPxth(['$', '.', '!']), createPxth(['$', '.', '!']))).toBeTruthy();
	});

	it('should return true when 2 paths are not the same', () => {
		expect(samePxth(createPxth(['a', 'b']), createPxth(['b', 'a']))).toBeFalsy();
		expect(samePxth(createPxth(['']), createPxth(['.']))).toBeFalsy();
		expect(samePxth(createPxth(['', '.', '']), createPxth(['', ',', '']))).toBeFalsy();
		expect(samePxth(createPxth(['%', '.', '!']), createPxth(['!', '.', '%']))).toBeFalsy();
		expect(samePxth(createPxth(['', '.', '']), createPxth(['', '.', '', 'asdf']))).toBeFalsy();
	});
});
