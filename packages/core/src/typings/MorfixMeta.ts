import { FieldError } from './FieldError';
import { FormMeta } from './FormMeta';
import { FieldTouched } from './MorfixTouched';

export type MorfixMeta<T> = {
    globalMeta: FormMeta;
    errors: FieldError<T>;
    touched: FieldTouched<T>;
};
