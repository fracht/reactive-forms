import get from 'lodash/get';

import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';

export const deepGet = <V>(object: unknown, path: Pxth<V>): V => {
    const source = getPxthSegments(path);

    if (source.length === 0) {
        return object as V;
    }

    return get(object, source);
};
