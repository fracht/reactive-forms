import { useEffect, useState } from 'react';
import { get } from 'lodash';

import { useFieldValidator } from './useFieldValidator';
import { useMorfixContext } from './useMorfixContext';
import { FieldValidator, MorfixTouched } from '../typings';
import { FieldContext } from '../typings/FieldContext';

export interface FieldContextProps<V> {
    name: string;
    validator?: FieldValidator<V>;
}

export const useDefaultFieldContext = <V>({ name, validator }: FieldContextProps<V>): FieldContext<V> => {
    const { registerField, unregisterField, setFieldValue, setFieldTouched, values } = useMorfixContext();

    const [value, setValue] = useState<V>(() => get(values.current, name));
    const [touched, setTouched] = useState<MorfixTouched<V>>();
    const error = useFieldValidator({ name, validator });

    useEffect(() => {
        const observers = {
            valueObserver: setValue,
            touchObserver: setTouched,
            validator: validator
        };

        registerField<V>(name, observers);
        return () => unregisterField(name, observers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registerField, unregisterField, name, validator]);

    return {
        value,
        meta: {
            error,
            touched
        },
        control: {
            setValue: (value: V) => setFieldValue(name, value),
            setTouched: (touched: MorfixTouched<V>) => setFieldTouched(name, touched)
        }
    };
};
