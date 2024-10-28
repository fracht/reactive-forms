import { createPxth } from './createPxth';
import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';

export const joinPxths = (...segments: Pxth<unknown>[]): Pxth<unknown> => {
	if (segments.length === 0) {
		return createPxth([]);
	}

	return createPxth(segments.map(getPxthSegments).flat());
};
