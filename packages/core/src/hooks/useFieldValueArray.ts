import { useEffect, useState } from 'react';

import { useFormContext } from './useFormContext';

export type FieldValueArrayConfig<T extends object> = Record<keyof T, string>;

export const useFieldValueArray = <T extends object>(paths: FieldValueArrayConfig<T>): T => {
    const {
        values: { watch },
        getFieldValue
    } = useFormContext();

    const [object, setObject] = useState<T>(() =>
        Object.entries(paths).reduce((acc, [to, from]) => {
            acc[to] = getFieldValue(from as string);

            return acc;
        }, {} as T)
    );

    useEffect(() => {
        const cleanups = Object.entries(paths).map(([to, from]) =>
            watch(from as string, (value) => {
                setObject((prev) => ({
                    ...prev,
                    [to]: value
                }));
            })
        );

        return () => cleanups.forEach((cleanup) => cleanup());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.keys(paths), ...Object.values(paths), watch]);

    return object;
};
