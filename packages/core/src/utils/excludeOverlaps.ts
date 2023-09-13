import unset from 'lodash/unset';
import { RootPathToken } from 'pxth';

import { getDifferenceMap } from './getDifferenceMap';

export const excludeOverlaps = <T>(
	source: Record<string, unknown>,
	compare: Record<string, unknown>,
	exclusionObject: T,
): Partial<T> => {
	const diffMap = getDifferenceMap(source, compare);

	if (diffMap[RootPathToken]) return {};

	if (diffMap[RootPathToken] === false) return exclusionObject;

	Object.keys(diffMap)
		.sort((a, b) => a.length - b.length)
		.forEach((key) => {
			if (diffMap[key]) {
				unset(exclusionObject, key);
			}
		});

	return exclusionObject;
};
