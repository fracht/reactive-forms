import { describe, expect, it } from 'vitest';

import { createPxth, getPxthSegments } from '../src';

describe('getPxthSegments', () => {
	it('should return all segments', () => {
		expect(getPxthSegments(createPxth(['hello', 'world']))).toStrictEqual(['hello', 'world']);
		expect(getPxthSegments(createPxth([]))).toStrictEqual([]);
	});
});
