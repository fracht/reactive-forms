import unset from 'lodash/unset';
import { RootPathToken } from 'pxth';

import { getDifferenceMap } from './getDifferenceMap';

export const excludeOverlaps = <T>(source: object, compare: object, exclusionObject: T): Partial<T> => {
	const diffMap = getDifferenceMap(source, compare);

	if (diffMap[RootPathToken]) {
		return {};
	}

	if (diffMap[RootPathToken] === false) {
		return exclusionObject;
	}

	for (const key of Object.keys(diffMap).sort((a, b) => a.length - b.length)) {
		if (diffMap[key]) {
			unset(exclusionObject, key);
		}
	}

	return exclusionObject;
};
