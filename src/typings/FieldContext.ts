import { MorfixErrors } from './MorfixErrors';
import { MorfixTouched } from './MorfixTouched';

export type FieldContext<V> = {
    value: V;
    meta: {
        error?: MorfixErrors<V>;
        touched?: MorfixTouched<V>;
    };
    control: {
        setValue: (value: V) => void;
        setTouched: (touched: MorfixTouched<V> | undefined) => void;
        setError: (error: MorfixErrors<V> | undefined) => void;
    };
};
