import { Pxth } from 'pxth';

import { useFieldError } from '../../helpers/useFieldError';
import { useFieldTouched } from '../../helpers/useFieldTouched';
import { FieldValidationProps, useFieldValidator } from '../../helpers/useFieldValidator';
import { useFieldValue } from '../../helpers/useFieldValue';
import { FieldContext } from '../../typings/FieldContext';

export type FieldConfig<V> = {
	name: Pxth<V>;
} & FieldValidationProps<V>;

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
