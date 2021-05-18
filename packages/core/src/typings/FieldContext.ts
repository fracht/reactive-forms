import { FieldError } from './FieldError';
import { FieldTouched } from './MorfixTouched';

export type FieldContext<V> = {
    value: V;
    meta: {
        error?: FieldError<V>;
        touched?: FieldTouched<V>;
    };
    control: {
        setValue: (value: V) => void;
        setTouched: (touched: FieldTouched<V> | undefined) => void;
        setError: (error: FieldError<V> | undefined) => void;
    };
};
