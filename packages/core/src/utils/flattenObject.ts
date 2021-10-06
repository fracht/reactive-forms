import { RootPath, RootPathToken } from 'pxth';

import { joinPaths } from './joinPaths';

export const flattenObject = (obj: object): Record<string, unknown> => {
    const queue: Array<[string | RootPath, object]> = [[RootPathToken, obj]];

    const result: Record<string, unknown> = {};

    while (queue.length) {
        const [pathToObject, innerObject] = queue.shift()!;

        for (const key in innerObject) {
            const item = innerObject[key];
            const pathToItem = joinPaths(pathToObject, key);
            if (typeof item !== 'object' || item === null || Object.keys(item).length === 0) {
                result[pathToItem] = item;
            } else {
                queue.push([pathToItem, item]);
            }
        }
    }

    return result;
};
