import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';

export const samePxth = (
    pxth1: Pxth<unknown>,
    pxth2: Pxth<unknown>,
): boolean => {
    const segments1 = getPxthSegments(pxth1);
    const segments2 = getPxthSegments(pxth2);

    if (segments1.length !== segments2.length) {
        return false;
    }

    for (let i = 0; i < segments1.length; i++) {
        if (segments1[i] !== segments2[i]) {
            return false;
        }
    }

    return true;
};
