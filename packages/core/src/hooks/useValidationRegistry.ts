import { useCallback, useRef } from 'react';
import { deepGet, deepSet, getPxthSegments, isInnerPxth, longestCommonPxth, Pxth, samePxth } from 'pxth';
import { PxthMap } from 'stocked';
import invariant from 'tiny-invariant';

import { FieldError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';
import { FunctionArray } from '../utils/FunctionArray';
import { validatorResultToError } from '../utils/validatorResultToError';

export type ValidationRegistry = PxthMap<FunctionArray<FieldValidator<unknown>>>;

export type ValidationRegistryControl = {
	validateBranch: <V>(origin: Pxth<V>, values: V) => Promise<{ attachPath: Pxth<V>; errors: FieldError<unknown> }>;
	registerValidator: <V>(name: Pxth<V>, validator: FieldValidator<V>) => () => void;
	validateField: <V>(name: Pxth<V>, value: V) => Promise<FieldError<V> | undefined>;
	validateAllFields: <V extends object>(values: V) => Promise<FieldError<V>>;
	hasValidator: <V>(name: Pxth<V>) => boolean;
};

export const useValidationRegistry = (): ValidationRegistryControl => {
	const registry = useRef<ValidationRegistry>(new PxthMap());

	const registerValidator = useCallback(<V>(name: Pxth<V>, validator: FieldValidator<V>) => {
		if (!registry.current.has(name)) {
			registry.current.set(name, new FunctionArray());
		}

		registry.current.get(name).push(validator as FieldValidator<unknown>);

		return () => {
			const currentValidators: FunctionArray<FieldValidator<unknown>> | undefined = registry.current.get(name);

			invariant(currentValidators, 'Cannot unregister field validator on field, which was not registered');

			currentValidators.remove(validator as FieldValidator<unknown>);

			if (currentValidators.isEmpty()) {
				registry.current.remove(name);
			}
		};
	}, []);

	const validateField = useCallback(async <V>(name: Pxth<V>, value: V): Promise<FieldError<V> | undefined> => {
		if (registry.current.has(name)) {
			const output = await (registry.current.get(name) as FunctionArray<FieldValidator<V>>).lazyAsyncCall(value);
			return validatorResultToError(output);
		}

		return undefined;
	}, []);

	const hasValidator = useCallback(<V>(name: Pxth<V>) => registry.current.has(name), []);

	const validateBranch = useCallback(
		async <V>(origin: Pxth<V>, values: V): Promise<{ attachPath: Pxth<V>; errors: FieldError<unknown> }> => {
			const pathsToValidate = registry.current
				.keys()
				.filter(
					(i) =>
						isInnerPxth(origin as Pxth<unknown>, i) ||
						isInnerPxth(i, origin as Pxth<unknown>) ||
						samePxth(origin as Pxth<unknown>, i),
				)
				.sort((a, b) => getPxthSegments(a).length - getPxthSegments(b).length);

			let errors: FieldError<V> = {} as FieldError<V>;

			for (const path of pathsToValidate) {
				const error = await validateField(path, deepGet(values, path));
				errors = deepSet(errors, path, error) as FieldError<V>;
			}

			return { attachPath: longestCommonPxth(pathsToValidate) as Pxth<V>, errors };
		},
		[validateField],
	);

	const validateAllFields = useCallback(async <V extends object>(values: V): Promise<FieldError<V>> => {
		const reducedErrors: FieldError<V> = {} as FieldError<V>;

		const allValidatorKeys = registry.current
			.keys()
			.sort((a, b) => getPxthSegments(a).length - getPxthSegments(b).length);

		for (const key of allValidatorKeys) {
			const error = await registry.current.get(key).lazyAsyncCall(deepGet(values, key));
			if (error) {
				deepSet(reducedErrors, key, validatorResultToError(error));
			}
		}

		return reducedErrors;
	}, []);

	return {
		registerValidator,
		validateField,
		validateAllFields,
		hasValidator,
		validateBranch,
	};
};
