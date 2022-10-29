import { Pxth } from 'pxth';

import { InitialFormState } from '../hooks/useForm';
import { FormControl } from '../hooks/useFormControl';
import { ValidationRegistryControl } from '../hooks/useValidationRegistry';
import { FieldError } from './FieldError';
import { FieldPostProcessor } from './FieldPostProcessor';

export type FormHelpers<Values extends object> = FormControl<Values> & {
	validateForm: (values: Values) => Promise<FieldError<Values>>;
	resetForm: (state?: InitialFormState<Values>) => void;
	paths: Pxth<Values>;
	registerPostprocessor: <V>(postprocessor: FieldPostProcessor<V>) => () => void;
} & Pick<ValidationRegistryControl, 'validateField'>;
