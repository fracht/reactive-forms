import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import { RootPath, RootPathToken } from 'pxth';

import { flattenObject } from './flattenObject';

export type DifferenceMap = Record<string | RootPath, boolean>;

const nearestChild = (parentPath: string | RootPath, comparePath: string) => {
	const indexOfDot = comparePath.indexOf('.', parentPath === RootPathToken ? 0 : parentPath.length + 1);

	return indexOfDot === -1 ? comparePath : comparePath.substring(0, indexOfDot);
};

const isInnerPath = (parent: string | RootPath, child: string) => {
	if (parent === RootPathToken) {
		return true;
	}

	if (parent === '') {
		return child[0] === '.';
	}

	return child.indexOf(parent + '.') === 0;
};

export const getDifferenceMap = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): DifferenceMap => {
	const flattenedObj1 = flattenObject(obj1);
	const flattenedObj2 = flattenObject(obj2);

	if (Object.keys(flattenedObj1).length === 0 && Object.keys(flattenedObj2).length === 0) {
		return { [RootPathToken]: true };
	}

	if (Object.keys(flattenedObj1).length === 0 || Object.keys(flattenedObj2).length === 0) {
		return { [RootPathToken]: false };
	}

	const rawDiffMap: DifferenceMap = {} as DifferenceMap;

	Object.keys(flattenedObj1).forEach((key) => (rawDiffMap[key] = isEqual(flattenedObj1[key], flattenedObj2[key])));

	// Reducing rawDiffMap
	// if all nested values is the same, we can assume that whole object is same.

	const diffMap = {} as DifferenceMap;

	const pathQueue: Array<string> = [RootPathToken as unknown as string];

	while (pathQueue.length) {
		const curPath = pathQueue.shift()!;
		const innerPaths = Object.keys(rawDiffMap).filter((innerPath) => isInnerPath(curPath, innerPath));
		if (
			innerPaths.every(
				(innerPath, index, arr) => index === 0 || rawDiffMap[innerPath] === rawDiffMap[arr[index - 1]],
			)
		) {
			diffMap[curPath as string] = rawDiffMap[innerPaths[0] ?? curPath];
		} else {
			pathQueue.push(...uniq(innerPaths.map((innerPath) => nearestChild(curPath, innerPath))));
		}
	}

	return diffMap;
};
