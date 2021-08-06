import { FieldError } from './FieldError';
import { InitialFormState } from '../hooks/useForm';
import { FormControl } from '../hooks/useFormControl';
import { ValidationRegistryControl } from '../hooks/useValidationRegistry';

export type FormHelpers<Values extends object> = FormControl<Values> & {
    validateForm: (values: Values) => Promise<FieldError<Values>>;
    resetForm: (state?: InitialFormState<Values>) => void;
} & Pick<ValidationRegistryControl, 'validateField'>;
