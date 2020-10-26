import { useEffect, useRef } from 'react';

import { useMorfixContext } from './useMorfixContext';
import { FieldValidator } from '../typings';

export type UseFieldValidatorConfig<V> = {
    name: string;
    validator?: FieldValidator<V>;
};

export const useFieldValidator = <V>({ name, validator: validatorFn }: UseFieldValidatorConfig<V>) => {
    const {
        validationRegistry: { registerValidator, unregisterValidator }
    } = useMorfixContext();

    const validatorRef = useRef(validatorFn);

    validatorRef.current = validatorFn;

    useEffect(() => {
        const validator = (value: V) => validatorRef.current?.(value);

        registerValidator(name, validator);

        return () => unregisterValidator(name, validator);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, registerValidator, unregisterValidator]);
};
