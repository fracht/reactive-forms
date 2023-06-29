import { FieldError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';

export type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;

export const validatorResultToError = <V>(result: UnwrapPromise<ReturnType<FieldValidator<V>>>): FieldError<V> => {
	if (typeof result !== 'object' || result === null) {
		return {
			$error: typeof result === 'string' ? result : undefined,
		} as FieldError<V>;
	}

	return result as FieldError<V>;
};
