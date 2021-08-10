import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import { ROOT_PATH } from 'stocked';

import { flattenObject } from './flattenObject';

export type DifferenceMap = Record<string | typeof ROOT_PATH, boolean>;

const nearestChild = (parentPath: string | symbol, comparePath: string | symbol) => {
    const indexOfDot = comparePath
        .toString()
        .indexOf('.', parentPath === ROOT_PATH ? 0 : (parentPath as string).length + 1);

    return indexOfDot === -1 ? comparePath : comparePath.toString().substring(0, indexOfDot);
};

const isInnerPath = (parent: string | symbol, child: string | symbol) => {
    if (parent === ROOT_PATH) {
        return true;
    }

    if (parent === '') {
        return child[0] === '.';
    }

    return child.toString().indexOf(parent.toString()) === 0;
};

export const getDifferenceMap = (obj1: object, obj2: object): DifferenceMap => {
    const flattenedObj1 = flattenObject(obj1);
    const flattenedObj2 = flattenObject(obj2);

    if (Object.keys(flattenedObj1).length === 0 && Object.keys(flattenedObj2).length === 0) {
        return { [ROOT_PATH]: true };
    }

    if (Object.keys(flattenedObj1).length === 0 || Object.keys(flattenedObj2).length === 0) {
        return { [ROOT_PATH]: false };
    }

    const rawDiffMap: DifferenceMap = {} as DifferenceMap;

    Object.keys(flattenedObj1).forEach((key) => (rawDiffMap[key] = isEqual(flattenedObj1[key], flattenedObj2[key])));

    // Reducing rawDiffMap
    // if all nested values is the same, we can assume that whole object is same.

    const diffMap = {} as DifferenceMap;

    const pathQueue: Array<string | symbol> = [ROOT_PATH];

    while (pathQueue.length) {
        const curPath = pathQueue.shift()!;
        const innerPaths = Object.keys(rawDiffMap).filter((innerPath) => isInnerPath(curPath, innerPath));
        if (
            innerPaths.every(
                (innerPath, index, arr) => index === 0 || rawDiffMap[innerPath] === rawDiffMap[arr[index - 1]]
            )
        ) {
            diffMap[curPath as string] = rawDiffMap[innerPaths[0]];
        } else {
            pathQueue.push(...uniq(innerPaths.map((innerPath) => nearestChild(curPath, innerPath))));
        }
    }

    return diffMap;
};
