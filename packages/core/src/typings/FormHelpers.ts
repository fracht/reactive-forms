import { FieldError } from './FieldError';
import { FormResetConfig, ValidationRegistryControl } from '../hooks';
import { FormControl } from '../hooks/useFormControl';

export type FormHelpers<Values extends object> = FormControl<Values> & {
    validateForm: (values: Values) => Promise<FieldError<Values>>;
    resetForm: (config?: FormResetConfig<Values>) => void;
} & Pick<ValidationRegistryControl, 'validateField'>;
