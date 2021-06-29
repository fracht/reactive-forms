import { FieldError } from './FieldError';
import { MorfixResetConfig } from '../hooks';
import { MorfixControl } from '../hooks/useMorfixControl';

export type MorfixHelpers<Values extends object> = MorfixControl<Values> & {
    validateField: <V>(name: string, value: V) => Promise<FieldError<V> | undefined>;
    validateForm: (values: Values) => Promise<FieldError<Values>>;
    resetForm: (config?: MorfixResetConfig<Values>) => void;
};
