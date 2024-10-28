import { createPxth } from './createPxth';
import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';

/**
 * Finds longest common path.
 * @example
 * [['hello', 'world'], ['hello', 'world, 'yes'], ['hello', 'world', 'bye', 'asdf']] -> 'hello.world'
 * [['a'], ['b'], ['c']] -> RootPathToken
 */
export const longestCommonPxth = (paths: Pxth<unknown>[]): Pxth<unknown> => {
	if (paths.length === 0) {
		return createPxth([]);
	}

	const segmentedPaths = paths.map(getPxthSegments);

	const somePath = segmentedPaths[0]!;

	for (let i = 0; i < somePath.length; i++) {
		const segment = somePath[i];

		for (let j = 1; j < segmentedPaths.length; j++) {
			if (segmentedPaths[j]![i] !== segment) {
				return createPxth(somePath.slice(0, i));
			}
		}
	}

	return paths[0];
};
