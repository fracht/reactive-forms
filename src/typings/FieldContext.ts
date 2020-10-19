import { MorfixErrors } from './MorfixErrors';

export type FieldContext<V> = {
    value: V;
    meta: {
        error?: MorfixErrors<V>;
    };
    control: {
        setValue: (value: V) => void;
    };
};
