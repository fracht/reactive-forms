import { useCallback } from 'react';

import { useFieldValidator } from './useFieldValidator';
import { useMorfixContext } from './useMorfixContext';
import { useObservedTouched } from './useObservedTouched';
import { useObservedValue } from './useObservedValue';
import { FieldValidator, MorfixErrors, MorfixTouched } from '../typings';
import { FieldContext } from '../typings/FieldContext';

export interface FieldContextProps<V> {
    name: string;
    validator?: FieldValidator<V>;
}

export const useDefaultFieldContext = <V>({ name, validator }: FieldContextProps<V>): FieldContext<V> => {
    const { setFieldValue, setFieldTouched, setFieldError } = useMorfixContext();

    const value = useObservedValue<V>(name);
    const touched = useObservedTouched<V>(name);
    const error = useFieldValidator({ name, validator });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setValue = useCallback((value: V) => setFieldValue(name, value), [setFieldValue, name]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setTouched = useCallback((value: MorfixTouched<V>) => setFieldTouched(name, value), [setFieldTouched, name]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setError = useCallback((value: MorfixErrors<V>) => setFieldError(name, value), [setFieldError, name]);

    return {
        value,
        meta: {
            error,
            touched
        },
        control: {
            setValue,
            setTouched,
            setError
        }
    };
};
