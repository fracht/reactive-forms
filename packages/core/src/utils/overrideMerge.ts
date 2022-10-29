import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';

export const overrideMerge = (object: object, source: object) => {
	object = cloneDeep(object);

	const queue = [[object, source]];

	while (queue.length > 0) {
		const [currentObject, currentSource] = queue.shift()!;

		for (const [key, value] of Object.entries(currentSource)) {
			if (!(key in currentObject)) {
				currentObject[key] = cloneDeep(value);
				continue;
			}

			const compareValue = currentObject[key];
			const compareSourceValue = currentSource[key];

			if (isObject(compareValue) && isObject(compareSourceValue)) {
				queue.push([compareValue, compareSourceValue]);
			} else {
				currentObject[key] = cloneDeep(currentSource[key]);
			}
		}
	}

	return object;
};
