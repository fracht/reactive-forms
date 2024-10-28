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
		const newObj = Object.keys(obj).reduce((acc, key) => {
			const value =
				typeof (obj as Record<string, unknown>)[key] === 'object'
					? deepRemoveEmpty((obj as Record<string, object>)[key])
					: (obj as Record<string, object>)[key];

			if (!isNil(value)) {
				(acc as Record<string, object>)[key] = value;
			}

			return acc;
		}, {});
		return isEmpty(newObj) ? undefined : newObj;
	}
	return undefined;
};
