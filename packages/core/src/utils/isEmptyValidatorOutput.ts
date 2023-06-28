import isNil from 'lodash/isNil';

import { FieldValidator } from '../typings/FieldValidator';

export const isEmptyValidatorOutput = <T>(error: Awaited<ReturnType<FieldValidator<T>>>) => {
	if (isNil(error)) {
		return true;
	}

	if (typeof error === 'object') {
		if (!isNil(error.$error)) {
			return false;
		}

		for (const key in error) {
			if (!isEmptyValidatorOutput(error[key])) {
				return false;
			}
		}
	} else {
		return false;
	}

	return true;
};
