import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';
import { type RootPath, RootPathToken } from './RootPath';

export const pxthToString = <V>(pxth: Pxth<V>): string | RootPath => {
    const segments = getPxthSegments(pxth);

    return segments.length === 0 ? RootPathToken : segments.join('.');
};
