import { useEffect, useRef, useState } from 'react';

import { FieldObservers } from './useMorfix';
import { useMorfixContext } from './useMorfixContext';
import { FieldValidator, MorfixErrors } from '../typings';

export type UseFieldValidatorConfig<V> = {
    name: string;
    validator?: FieldValidator<V>;
};

export const useFieldValidator = <V>({
    name,
    validator: validatorFn
}: UseFieldValidatorConfig<V>): MorfixErrors<V> | undefined => {
    const { registerField, unregisterField } = useMorfixContext();

    const [error, setError] = useState<MorfixErrors<V> | undefined>(undefined);

    const validatorRef = useRef(validatorFn);

    validatorRef.current = validatorFn;

    useEffect(() => {
        const observers: Partial<FieldObservers<V>> = {
            validator: (value: V) => validatorRef.current?.(value),
            errorObserver: setError
        };

        registerField(name, observers);

        return () => unregisterField(name, observers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, registerField, unregisterField]);

    return error;
};
