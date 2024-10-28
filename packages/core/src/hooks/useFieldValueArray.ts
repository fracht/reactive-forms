import { useEffect, useState } from 'react';
import { Pxth } from 'pxth';

import { useFormContext } from './useFormContext';

export type FieldValueArrayConfig<T extends object> = {
	[K in keyof T]: Pxth<T[K]>;
};

export const useFieldValueArray = <T extends object>(paths: FieldValueArrayConfig<T>): T => {
	const {
		values: { watch },
		getFieldValue,
	} = useFormContext();

	const [object, setObject] = useState<T>(() =>
		Object.entries(paths).reduce((acc, [to, from]) => {
			(acc as Record<string, unknown>)[to] = getFieldValue(from as Pxth<unknown>);

			return acc;
		}, {} as T),
	);

	useEffect(() => {
		const cleanups = Object.entries(paths).map(([to, from]) =>
			watch(from as Pxth<unknown>, (value) => {
				setObject((prev) => ({
					...prev,
					[to]: value,
				}));
			}),
		);

		return () => cleanups.forEach((cleanup) => cleanup());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...Object.keys(paths), ...Object.values(paths), watch]);

	return object;
};
