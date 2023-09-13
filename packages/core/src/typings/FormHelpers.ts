import { Pxth } from 'pxth';

import { FieldError } from './FieldError';
import { FieldPostProcessor } from './FieldPostProcessor';
import { InitialFormState } from '../components/Form/useForm';
import { FormControl } from '../components/Form/useFormControl';

export type FormHelpers<Values extends object> = FormControl<Values> & {
	validateForm: (values: Values) => Promise<FieldError<Values>>;
	validateField: <V>(name: Pxth<V>, value?: V) => Promise<FieldError<V> | undefined>;
	resetForm: (state?: InitialFormState<Values>) => void;
	paths: Pxth<Values>;
	registerPostprocessor: <V>(postprocessor: FieldPostProcessor<V>) => () => void;
};
