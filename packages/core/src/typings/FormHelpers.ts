import { FieldError } from './FieldError';
import { FormResetConfig } from '../hooks/useForm';
import { FormControl } from '../hooks/useFormControl';
import { ValidationRegistryControl } from '../hooks/useValidationRegistry';

export type FormHelpers<Values extends object> = FormControl<Values> & {
    validateForm: (values: Values) => Promise<FieldError<Values>>;
    resetForm: (config?: FormResetConfig<Values>) => void;
} & Pick<ValidationRegistryControl, 'validateField'>;
