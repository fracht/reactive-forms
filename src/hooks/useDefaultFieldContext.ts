import { useFieldValidator } from './useFieldValidator';
import { useMorfixError } from './useMorfixError';
import { useMorfixTouched } from './useMorfixTouched';
import { useMorfixValue } from './useMorfixValue';
import { FieldValidator } from '../typings';
import { FieldContext } from '../typings/FieldContext';

export interface FieldContextProps<V> {
    name: string;
    validator?: FieldValidator<V>;
}

export const useDefaultFieldContext = <V>({ name, validator }: FieldContextProps<V>): FieldContext<V> => {
    const [value, setValue] = useMorfixValue<V>(name);
    const [touched, setTouched] = useMorfixTouched<V>(name);
    const [error, setError] = useMorfixError<V>(name);

    useFieldValidator({ name, validator });

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
