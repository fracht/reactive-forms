import { createPxthProxy } from './createPxthProxy';
import type { Pxth } from './Pxth';
import type { PxthSegments } from './PxthSegments';

export const createPxth = <T>(path: PxthSegments): Pxth<T> => {
    return createPxthProxy(path);
};
