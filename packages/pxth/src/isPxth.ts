import { SegmentsToken } from './getPxthSegments';
import type { Pxth } from './Pxth';

export const isPxth = <T>(path: unknown): path is Pxth<T> =>
	typeof path === 'object' && path !== null && SegmentsToken in path;
