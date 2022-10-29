import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

export const deepRemoveEmpty = (object: object): object | undefined => {
	if (Array.isArray(object)) {
		const newArray = Object.assign(
			[],
			Object.fromEntries(
				Object.entries(object).map(([key, value]) => [
					key,
					typeof value === 'object' ? deepRemoveEmpty(value) : value,
				]),
			),
		);
		return Object.values(newArray).every(isNil) ? undefined : newArray;
	} else if (object !== null && typeof object === 'object') {
		const newObject = Object.keys(object).reduce((accumulator, key) => {
			const value = typeof object[key] === 'object' ? deepRemoveEmpty(object[key]) : object[key];

			if (!isNil(value)) {
				accumulator[key] = value;
			}

			return accumulator;
		}, {});
		return isEmpty(newObject) ? undefined : newObject;
	}
	return undefined;
};
