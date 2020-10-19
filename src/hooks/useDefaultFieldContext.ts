import { useEffect, useState } from 'react';
import { get } from 'lodash';

import { useMorfixContext } from './useMorfixContext';
import { FieldValidator } from '../typings';
import { FieldContext } from '../typings/FieldContext';
import { MorfixErrors } from '../typings/MorfixErrors';

export interface FieldContextProps<V> {
    name: string;
    validator?: FieldValidator<V>;
}

export const useDefaultFieldContext = <V>({ name, validator }: FieldContextProps<V>): FieldContext<V> => {
    const { registerField, setFieldValue, values } = useMorfixContext();

    const [value, setValue] = useState<V>(() => get(values.current, name));
    const [error, setError] = useState<MorfixErrors<V>>();

    useEffect(() => {
        registerField<V>(name, {
            valueObserver: setValue,
            errorObserver: setError,
            validator: validator
        });
    }, [registerField, name, validator]);

    return {
        value,
        meta: {
            error
        },
        control: {
            setValue: (value: V) => setFieldValue(name, value)
        }
    };
};
