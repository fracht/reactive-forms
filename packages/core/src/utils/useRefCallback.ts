import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRefCallback = <F extends (...arguments_: any[]) => any>(fn?: F): F => {
	const reference = useRef<F | undefined>(fn);

	reference.current = fn;

	const callback = useCallback((...args: Parameters<F>) => reference.current?.(...args), []);

	return callback as F;
};
