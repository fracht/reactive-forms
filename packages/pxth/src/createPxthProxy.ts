import { SegmentsToken } from './getPxthSegments';
import type { Pxth } from './Pxth';
import type { PxthSegments } from './PxthSegments';

const handlers: ProxyHandler<
    Record<string, Pxth<unknown>> & {
        [SegmentsToken]: string[];
    }
> = {
    get: (target, path) => {
        if (path === 'toJSON') {
            return () => ({ source: target[SegmentsToken] });
        }

        if (path === 'constructor') {
            return null;
        }

        if (path === SegmentsToken) {
            return target[SegmentsToken];
        }

        if (!(path in target)) {
            target[path as string] = createPxthProxy([
                ...target[SegmentsToken],
                path,
            ]);
        }

        return target[path as string];
    },
};

export const createPxthProxy = <Type>(path: PxthSegments): Pxth<Type> => {
    return new Proxy(
        {
            [SegmentsToken]: path,
        },
        handlers,
    ) as unknown as Pxth<Type>;
};
