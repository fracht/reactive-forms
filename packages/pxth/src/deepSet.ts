import set from 'lodash/set';

import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';

export const deepSet = <T>(
    object: object,
    path: Pxth<T>,
    value: T,
): unknown => {
    const segments = getPxthSegments(path);

    if (segments.length === 0) {
        return value;
    }

    return set(object, segments, value);
};
