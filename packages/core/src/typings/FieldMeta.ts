import { FieldError } from './FieldError';
import { FieldTouched } from './FieldTouched';

export type FieldMeta<V> = {
    error?: FieldError<V>;
    touched?: FieldTouched<V>;
};
