import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import { RootPath, RootPathToken } from 'pxth';

import { flattenObject } from './flattenObject';

export type DifferenceMap = Record<string | RootPath, boolean>;

const nearestChild = (parentPath: string | RootPath, comparePath: string) => {
	const indexOfDot = comparePath.indexOf('.', parentPath === RootPathToken ? 0 : parentPath.length + 1);

	return indexOfDot === -1 ? comparePath : comparePath.slice(0, Math.max(0, indexOfDot));
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

export const getDifferenceMap = (object1: object, object2: object): DifferenceMap => {
	const flattenedObject1 = flattenObject(object1);
	const flattenedObject2 = flattenObject(object2);

	if (Object.keys(flattenedObject1).length === 0 && Object.keys(flattenedObject2).length === 0) {
		return { [RootPathToken]: true };
	}

	if (Object.keys(flattenedObject1).length === 0 || Object.keys(flattenedObject2).length === 0) {
		return { [RootPathToken]: false };
	}

	const rawDiffMap: DifferenceMap = {} as DifferenceMap;

	for (const key of Object.keys(flattenedObject1)) {
		rawDiffMap[key] = isEqual(flattenedObject1[key], flattenedObject2[key]);
	}

	// Reducing rawDiffMap
	// If all nested values is the same, we can assume that whole object is same.

	const diffMap = {} as DifferenceMap;

	const pathQueue: Array<string> = [RootPathToken as unknown as string];

	while (pathQueue.length > 0) {
		const currentPath = pathQueue.shift()!;
		const innerPaths = Object.keys(rawDiffMap).filter((innerPath) => isInnerPath(currentPath, innerPath));
		if (
			innerPaths.every(
				(innerPath, index, array) => index === 0 || rawDiffMap[innerPath] === rawDiffMap[array[index - 1]],
			)
		) {
			diffMap[currentPath as string] = rawDiffMap[innerPaths[0] ?? currentPath];
		} else {
			pathQueue.push(...uniq(innerPaths.map((innerPath) => nearestChild(currentPath, innerPath))));
		}
	}

	return diffMap;
};
