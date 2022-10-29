import merge from 'lodash/merge';
import { Pxth } from 'pxth';
import { useEffect, useRef } from 'react';

import { FieldValidator } from '../typings/FieldValidator';
import { runYupSchema } from '../utils/runYupSchema';
import { validatorResultToError } from '../utils/validatorResultToError';
import { useFormContext } from './useFormContext';
import type { BaseSchema } from 'yup';

export type UseFieldValidatorConfig<V> = FieldValidationProps<V> & { name: Pxth<V> };

export type FieldValidationProps<V> = {
	validator?: FieldValidator<V>;
	schema?: BaseSchema<Partial<V> | V | undefined>;
};

export const useFieldValidator = <V>({ name, validator: validatorFunction, schema }: UseFieldValidatorConfig<V>) => {
	const { registerValidator } = useFormContext();

	const validate = async (value: V) => {
		if (!validatorFunction && !schema) {
			return;
		}

		const validatorErrors = validatorResultToError(await validatorFunction?.(value));
		const schemaErrors = schema ? await runYupSchema(schema, value) : undefined;

		if (!schemaErrors) {
			return validatorErrors;
		}

		return merge(schemaErrors, validatorErrors);
	};

	const validateReference = useRef(validate);

	validateReference.current = validate;

	useEffect(() => {
		const validator = (value: V) => validateReference.current(value);

		return registerValidator(name, validator);
	}, [name, registerValidator]);
};
