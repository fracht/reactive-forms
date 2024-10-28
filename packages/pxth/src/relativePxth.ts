import invariant from 'tiny-invariant';

import { createPxth } from './createPxth';
import { getPxthSegments } from './getPxthSegments';
import { isInnerPxth } from './isInnerPxth';
import type { Pxth } from './Pxth';
import { pxthToString } from './pxthToString';
import { samePxth } from './samePxth';

/**
 * Returns relative path. If subPath is not child of basePath, it will throw an error.
 * @example
 * relativePxth(['hello', 'world'], ['hello', 'world', 'asdf']) -> ['asdf'],
 * relativePxth(['a', 'b', 'c'], ['a', 'b', 'c', 'd', 'e']) -> ['d', 'e'],
 * relativePxth(['a', 'b', 'c'], ['a', 'b', 'c']) -> RootPathToken,
 * relativePxth(['a'], ['b']) -> Error
 */
export const relativePxth = (basePath: Pxth<unknown>, subPath: Pxth<unknown>): Pxth<unknown> => {
	const basePathSegments = getPxthSegments(basePath);
	const subPathSegments = getPxthSegments(subPath);

	if (samePxth(basePath as Pxth<unknown>, subPath as Pxth<unknown>)) {
		return createPxth([]);
	}

	if (basePathSegments.length === 0) {
		return subPath;
	}

	invariant(
		isInnerPxth(basePath, subPath),
		`"${pxthToString(subPath).toString()}" is not innner path of "${pxthToString(basePath).toString()}"`,
	);

	return createPxth(subPathSegments.slice(basePathSegments.length));
};
