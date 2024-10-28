import { describe, expect, it } from 'vitest';

import { createPxth, getPxthSegments, joinPxths } from '../src';

describe('joinPxths', () => {
	it('should join paths', () => {
		expect(getPxthSegments(joinPxths(createPxth(['hello']), createPxth(['world'])))).toStrictEqual([
			'hello',
			'world',
		]);
		expect(getPxthSegments(joinPxths(createPxth([]), createPxth(['hello'])))).toStrictEqual(['hello']);
		expect(getPxthSegments(joinPxths(createPxth([]), createPxth(['hello']), createPxth(['world'])))).toStrictEqual([
			'hello',
			'world',
		]);
		expect(getPxthSegments(joinPxths(createPxth(['hello.world', 'path']), createPxth(['another'])))).toStrictEqual([
			'hello.world',
			'path',
			'another',
		]);
		expect(getPxthSegments(joinPxths(createPxth(['..a.b.c...']), createPxth(['...'])))).toStrictEqual([
			'..a.b.c...',
			'...',
		]);
	});
});
