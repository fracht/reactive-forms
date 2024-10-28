import type { Pxth } from './Pxth';
import type { PxthSegments } from './PxthSegments';

export const SegmentsToken = Symbol();

export const getPxthSegments = <T>(pxth: Pxth<T>): PxthSegments => {
    const normalPxth = pxth as unknown as {
        [SegmentsToken]: PxthSegments;
    };

    return normalPxth[SegmentsToken];
};
