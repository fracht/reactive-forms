import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRefCallback = <F extends (...args: any[]) => any>(func: F): F => {
    const ref = useRef<F>(func);

    ref.current = func;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback((...args: Parameters<F>) => ref.current(...args), []);

    return callback as F;
};
