import { describe, expect, it } from 'vitest';

import { createPxth, pxthToString, RootPathToken } from '../src';

describe('pxthToString', () => {
	it('should convert pxth to string', () => {
		expect(pxthToString(createPxth(['hello', 'this', 'is', 'path']))).toBe('hello.this.is.path');
	});
	it('should convert empty pxth to RootPath', () => {
		expect(pxthToString(createPxth([]))).toBe(RootPathToken);
	});
});
