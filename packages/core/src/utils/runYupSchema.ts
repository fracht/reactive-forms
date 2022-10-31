import type { BaseSchema } from 'yup';
import type { ValidateOptions } from 'yup/lib/types';

import { isYupError } from './isYupError';
import { yupToFormErrors } from './yupToFormErrors';
import { FieldError } from '../typings/FieldError';

export const runYupSchema = async <V>(
	schema: BaseSchema<Partial<V> | undefined>,
	value: V,
	options?: ValidateOptions,
): Promise<FieldError<V> | undefined> => {
	try {
		await schema.validate(value, options);
	} catch (error) {
		if (isYupError(error)) {
			return yupToFormErrors(error);
		} else {
			throw error;
		}
	}
	return undefined;
};
