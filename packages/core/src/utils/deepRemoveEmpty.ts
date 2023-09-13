import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

export const deepRemoveEmpty = (obj: object): object | undefined => {
	if (Array.isArray(obj)) {
		const newArr = Object.assign(
			[],
			Object.fromEntries(
				Object.entries(obj).map(([key, value]) => [
					key,
					typeof value === 'object' ? deepRemoveEmpty(value) : value,
				]),
			),
		);
		return Object.values(newArr).every(isNil) ? undefined : newArr;
	} else if (obj !== null && typeof obj === 'object') {
		const casted = obj as Record<string, unknown>;
		const newObj = Object.keys(obj).reduce((acc, key) => {
			const value =
				typeof casted[key] === 'object' ? deepRemoveEmpty(casted[key] as Record<string, unknown>) : casted[key];

			if (!isNil(value)) {
				acc[key] = value;
			}

			return acc;
		}, {} as Record<string, unknown>);
		return isEmpty(newObj) ? undefined : newObj;
	}
	return undefined;
};
