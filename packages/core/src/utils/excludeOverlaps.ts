import unset from 'lodash/unset';
import { ROOT_PATH } from 'stocked';

import { getDifferenceMap } from './getDifferenceMap';

export const excludeOverlaps = <T>(source: object, compare: object, exclusionObject: T): Partial<T> => {
    const diffMap = getDifferenceMap(source, compare);

    if (diffMap[ROOT_PATH]) return {};

    if (diffMap[ROOT_PATH] === false) return exclusionObject;

    Object.keys(diffMap)
        .sort((a, b) => a.length - b.length)
        .forEach((key) => {
            if (diffMap[key]) {
                unset(exclusionObject, key);
            }
        });

    return exclusionObject;
};
