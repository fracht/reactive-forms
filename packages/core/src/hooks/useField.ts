import { Pxth } from 'pxth';

import { FieldContext } from '../typings/FieldContext';
import { useFieldError } from './useFieldError';
import { useFieldTouched } from './useFieldTouched';
import { FieldValidationProps as FieldValidationProperties, useFieldValidator } from './useFieldValidator';
import { useFieldValue } from './useFieldValue';

export type FieldConfig<V> = {
	name: Pxth<V>;
} & FieldValidationProperties<V>;

export const useField = <V>({ name, validator, schema }: FieldConfig<V>): FieldContext<V> => {
	const [value, setValue] = useFieldValue<V>(name);
	const [touched, setTouched] = useFieldTouched<V>(name);
	const [error, setError] = useFieldError<V>(name);

	useFieldValidator({ name, validator, schema });

	return {
		value,
		meta: {
			error,
			touched,
		},
		control: {
			setValue,
			setTouched,
			setError,
		},
	};
};
