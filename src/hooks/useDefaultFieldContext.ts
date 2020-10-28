import { FieldValidationProps, useFieldValidator } from './useFieldValidator';
import { useMorfixError } from './useMorfixError';
import { useMorfixTouched } from './useMorfixTouched';
import { useMorfixValue } from './useMorfixValue';
import { FieldContext } from '../typings/FieldContext';

export type FieldContextProps<V> = {
    name: string;
} & FieldValidationProps<V>;

export const useDefaultFieldContext = <V>({ name, validator, schema }: FieldContextProps<V>): FieldContext<V> => {
    const [value, setValue] = useMorfixValue<V>(name);
    const [touched, setTouched] = useMorfixTouched<V>(name);
    const [error, setError] = useMorfixError<V>(name);

    useFieldValidator({ name, validator, schema });

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
