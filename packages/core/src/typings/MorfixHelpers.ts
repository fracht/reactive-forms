import { FieldError } from './FieldError';
import { MorfixResetConfig } from '../hooks';
import { MorfixControl } from '../hooks/useMorfixControl';

export type MorfixHelpers<Values extends object> = Omit<MorfixControl<Values>, 'values'> & {
    validateField: <V>(name: string, value: V) => Promise<void>;
    validateForm: (values: Values) => Promise<FieldError<Values>>;

    resetForm: (config?: MorfixResetConfig<Values>) => void;
};
