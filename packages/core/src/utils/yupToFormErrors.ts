import get from 'lodash/get';
import set from 'lodash/set';
import toPath from 'lodash/toPath';
import { ValidationError } from 'yup';

import { getErrorPath } from '../constants';
import { FieldError } from '../typings/FieldError';

export const yupToFormErrors = <V>(yupError: ValidationError): FieldError<V> => {
	const isArray = yupError.inner?.some((value) => !Number.isNaN(+toPath(value.path)[0]));

	const errors: FieldError<V> = isArray ? ([] as unknown as FieldError<V>) : ({} as FieldError<V>);

	if (yupError.inner) {
		if (yupError.inner.length === 0) {
			set(errors, getErrorPath(yupError.path), yupError.message);
		}
		for (const error of yupError.inner) {
			if (!get(errors, error.path || '')) {
				set(errors, getErrorPath(error.path), error.message);
			}
		}
	}

	return errors;
};
