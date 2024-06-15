import { useCallback, useRef } from 'react';
import merge from 'lodash/merge';
import { createPxth, deepGet, deepSet, getPxthSegments, isInnerPxth, Pxth, samePxth } from 'pxth';
import { PxthMap } from 'stocked';
import invariant from 'tiny-invariant';

import { FieldError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';
import { FunctionArray } from '../utils/FunctionArray';
import { mergeErrors } from '../utils/mergeErrors';
import { UnwrapPromise, validatorResultToError } from '../utils/validatorResultToError';

export type ValidationRegistry = PxthMap<FunctionArray<FieldValidator<unknown>>>;

export type ValidationRegistryControl = {
	validateBranch: <V, T extends object>(
		origin: Pxth<V>,
		values: T,
	) => Promise<{ attachPath: Pxth<V>; errors: FieldError<T> }>;
	registerValidator: <V>(name: Pxth<V>, validator: FieldValidator<V>) => () => void;
	validateAllFields: <V extends object>(values: V) => Promise<FieldError<V>>;
	hasValidator: <V>(name: Pxth<V>) => boolean;
};

type ValidateBranchOutput<V, T> = { attachPath: Pxth<V>; errors: FieldError<T> };

export const useValidationRegistry = (): ValidationRegistryControl => {
	const registry = useRef<ValidationRegistry>(new PxthMap());

	const registerValidator = useCallback(<V>(name: Pxth<V>, validator: FieldValidator<V>) => {
		let validators = registry.current.get(name);

		if (!validators) {
			validators = new FunctionArray();
			registry.current.set(name, validators);
		}

		validators.push(validator as FieldValidator<unknown>);

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
			const outputs = await (registry.current.get(name) as FunctionArray<FieldValidator<V>>).asyncCall(value);

			let error: FieldError<V> | undefined = undefined;

			for (const output of outputs) {
				error = merge(validatorResultToError(output as UnwrapPromise<ReturnType<FieldValidator<V>>>), error);
			}

			return error;
		}

		return undefined;
	}, []);

	const hasValidator = useCallback(<V>(name: Pxth<V>) => registry.current.has(name), []);

	const validatePaths = useCallback(
		async <T>(pathsToValidate: Array<Pxth<unknown>>, values: T): Promise<FieldError<T>> => {
			pathsToValidate.sort((a, b) => getPxthSegments(a).length - getPxthSegments(b).length);

			let errors = {} as FieldError<T>;

			for (const path of pathsToValidate) {
				const error = await validateField(path, deepGet(values, path));
				const newErrors = deepSet({}, path, error) as FieldError<T>;
				errors = mergeErrors(errors, newErrors);
			}

			return errors;
		},
		[validateField],
	);

	const validateBranch = useCallback(
		async <V, T extends object>(origin: Pxth<V>, values: T): Promise<ValidateBranchOutput<V, T>> => {
			const pathsToValidate = registry.current
				.keys()
				.filter(
					(i) =>
						isInnerPxth(origin as Pxth<unknown>, i) ||
						isInnerPxth(i, origin as Pxth<unknown>) ||
						samePxth(origin as Pxth<unknown>, i),
				);

			const errors = await validatePaths(pathsToValidate, values);

			return { attachPath: (pathsToValidate[0] ?? createPxth([])) as Pxth<V>, errors };
		},
		[validatePaths],
	);

	const validateAllFields = useCallback(
		async <V extends object>(values: V): Promise<FieldError<V>> => {
			const allValidatorKeys = registry.current.keys();

			return await validatePaths(allValidatorKeys, values);
		},
		[validatePaths],
	);

	return {
		registerValidator,
		validateAllFields,
		hasValidator,
		validateBranch,
	};
};
