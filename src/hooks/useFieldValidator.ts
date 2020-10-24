import { useEffect, useRef } from 'react';

import { useMorfixContext } from './useMorfixContext';
import { useObservedError } from './useObservedError';
import { FieldValidator, MorfixErrors } from '../typings';

export type UseFieldValidatorConfig<V> = {
    name: string;
    validator?: FieldValidator<V>;
};

export const useFieldValidator = <V>({
    name,
    validator: validatorFn
}: UseFieldValidatorConfig<V>): MorfixErrors<V> | undefined => {
    const { registerValidator, unregisterValidator } = useMorfixContext();

    const error = useObservedError<V>(name);

    const validatorRef = useRef(validatorFn);

    validatorRef.current = validatorFn;

    useEffect(() => {
        const registeredValidator = (value: V) => validatorRef.current?.(value);

        registerValidator(name, registeredValidator);

        return () => unregisterValidator(name, registeredValidator);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, registerValidator, unregisterValidator]);

    return error;
};
