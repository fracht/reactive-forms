import { FieldError } from './FieldError';
import { MorfixResetConfig, ValidationRegistryControl } from '../hooks';
import { MorfixControl } from '../hooks/useMorfixControl';

export type MorfixHelpers<Values extends object> = MorfixControl<Values> & {
    validateForm: (values: Values) => Promise<FieldError<Values>>;
    resetForm: (config?: MorfixResetConfig<Values>) => void;
} & Pick<ValidationRegistryControl, 'validateField'>;
