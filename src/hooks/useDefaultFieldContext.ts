import { useEffect, useState } from 'react';

import { useMorfixContext } from './useMorfixContext';

export const useDefaultFieldContext = <V>({ name }: { name: string }): [V | undefined, (value: V) => void] => {
    const { registerField, setFieldValue } = useMorfixContext();

    const [value, setValue] = useState<V>();

    useEffect(() => {
        registerField<V>(name, setValue);
    }, [registerField, name]);

    return [value, (value: V) => setFieldValue(name, value)];
};
