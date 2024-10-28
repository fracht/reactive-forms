import { shuffle } from 'lodash';
import { describe, expect, it } from 'vitest';

import { createPxth, getPxthSegments, longestCommonPxth } from '../src';

describe('longestCommonPxth', () => {
	it('hit cases', () => {
		expect(getPxthSegments(longestCommonPxth([]))).toStrictEqual([]);
		expect(getPxthSegments(longestCommonPxth([createPxth([])]))).toStrictEqual([]);
		expect(getPxthSegments(longestCommonPxth([createPxth(['asdf'])]))).toStrictEqual(['asdf']);
	});
	it('should return longest common path', () => {
		expect(
			getPxthSegments(
				longestCommonPxth([
					createPxth(['asdf']),
					createPxth(['asdf', 'hello']),
					createPxth(['asdf', 'bye']),
					createPxth(['asdf', 'hello', 'bye']),
				]),
			),
		).toStrictEqual(['asdf']);
		expect(
			getPxthSegments(
				longestCommonPxth([
					createPxth(['hello', 'this', 'is', 'world']),
					createPxth(['hello', 'this', 'is', 'bye']),
					createPxth(['hello', 'this', 'is']),
				]),
			),
		).toStrictEqual(['hello', 'this', 'is']);
	});
	it('no common paths', () => {
		expect(
			getPxthSegments(
				longestCommonPxth(
					shuffle([
						createPxth(['asdf']),
						createPxth(['asdf', 'hello']),
						createPxth(['asdf', 'bye']),
						createPxth(['asdf', 'hello', 'bye']),
						createPxth(['b']),
					]),
				),
			),
		).toStrictEqual([]);
		expect(
			getPxthSegments(
				longestCommonPxth(
					shuffle([
						createPxth(['hello', 'this', 'is', 'world']),
						createPxth(['hello', 'this', 'is', 'bye']),
						createPxth(['hello', 'this', 'is']),
						createPxth(['ahello']),
					]),
				),
			),
		).toStrictEqual([]);
	});
});
