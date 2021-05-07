import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';

import { flattenObject } from './flattenObject';

export type DifferenceMap = Record<string, boolean>;

const nearestChild = (parentPath: string, comparePath: string) => {
    const indexOfDot = comparePath.substring(parentPath.length + 1).indexOf('.');
    return indexOfDot === -1 ? comparePath : comparePath.substring(0, parentPath.length + indexOfDot + 1);
};

export const getDifferenceMap = (obj1: object, obj2: object): DifferenceMap => {
    const flattenedObj1 = flattenObject(obj1);
    const flattenedObj2 = flattenObject(obj2);

    if (Object.keys(flattenedObj1).length === 0 && Object.keys(flattenedObj2).length === 0) return { '': true };

    if (Object.keys(flattenedObj1).length === 0 || Object.keys(flattenedObj2).length === 0) return { '': false };

    const rawDiffMap: DifferenceMap = {};

    Object.keys(flattenedObj1).forEach((key) => (rawDiffMap[key] = isEqual(flattenedObj1[key], flattenedObj2[key])));

    // Reducing rawDiffMap
    // if all nested values is the same, we can assume that whole object is same.

    const diffMap = {};

    const pathQueue = [''];

    while (pathQueue.length) {
        const curPath = pathQueue.shift()!;
        const innerPaths = Object.keys(rawDiffMap).filter((innerPath) => innerPath.indexOf(curPath) === 0);
        if (
            innerPaths.every(
                (innerPath, index, arr) => index === 0 || rawDiffMap[innerPath] === rawDiffMap[arr[index - 1]]
            )
        ) {
            diffMap[curPath] = rawDiffMap[innerPaths[0]];
        } else {
            pathQueue.push(...uniq(innerPaths.map((innerPath) => nearestChild(curPath, innerPath))));
        }
    }

    return diffMap;
};
