import { getPxthSegments } from './getPxthSegments';
import type { Pxth } from './Pxth';
import { samePxth } from './samePxth';

/**
 * Function, which indicates, if path is child of another or not.
 *
 * @example
 *
 * isInnerPxth(['parent'], ['parent', 'child']) -> true
 * isInnerPxth(['notParent'], ['parent', 'child']) -> false
 *
 * @param basePath - path, which is probably parent
 * @param path - path, which is probably child of basePath
 */
export const isInnerPxth = (
    basePath: Pxth<unknown>,
    path: Pxth<unknown>,
): boolean => {
    const basePathSegments = getPxthSegments(basePath);
    const pathSegments = getPxthSegments(path);

    if (pathSegments.length === 0 || samePxth(basePath, path)) {
        return false;
    }

    if (basePathSegments.length === 0) {
        return true;
    }

    for (let i = 0; i < basePathSegments.length; i++) {
        if (basePathSegments[i] !== pathSegments[i]) {
            return false;
        }
    }

    return true;
};
