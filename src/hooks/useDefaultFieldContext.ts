import { useCallback, useEffect, useState } from 'react';
import { get } from 'lodash';

import { useFieldValidator } from './useFieldValidator';
import { useMorfixContext } from './useMorfixContext';
import { FieldValidator, MorfixErrors, MorfixTouched } from '../typings';
import { FieldContext } from '../typings/FieldContext';

export interface FieldContextProps<V> {
    name: string;
    validator?: FieldValidator<V>;
}

export const useDefaultFieldContext = <V>({ name, validator }: FieldContextProps<V>): FieldContext<V> => {
    const {
        registerField,
        unregisterField,
        setFieldValue,
        setFieldTouched,
        setFieldError,
        values
    } = useMorfixContext();

    const [value, setValueState] = useState<V>(() => get(values.current, name));
    const [touched, setTouchedState] = useState<MorfixTouched<V>>();
    const error = useFieldValidator({ name, validator });

    useEffect(() => {
        const observers = {
            valueObserver: setValueState,
            touchObserver: setTouchedState,
            validator: validator
        };

        registerField<V>(name, observers);
        return () => unregisterField(name, observers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerField, unregisterField, name, validator]);

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
