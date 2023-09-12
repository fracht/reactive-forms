import { useEffect } from 'react';
import { Pxth } from 'pxth';

import { useFormContext } from './useFormContext';
import { FieldValidator } from '../typings/FieldValidator';
import { validatorResultToError } from '../utils/validatorResultToError';

export type UseFieldValidatorConfig<V> = FieldValidationProps<V> & { name: Pxth<V> };

export type FieldValidationProps<V> = {
	validator?: FieldValidator<V>;
};

export const useFieldValidator = <V>({ name, validator }: UseFieldValidatorConfig<V>) => {
	const { registerValidator } = useFormContext();

	useEffect(
		() =>
			registerValidator(name, async (value: V) => {
				if (!validator) return undefined;

				return validatorResultToError(await validator?.(value));
			}),
		[name, registerValidator, validator],
	);
};
