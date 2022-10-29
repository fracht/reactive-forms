import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';

export const overrideMerge = (object: object, source: object) => {
	object = cloneDeep(object);

	const queue = [[object, source]];

	while (queue.length) {
		const [currentObject, currentSource] = queue.shift()!;

		Object.entries(currentSource).forEach(([key, value]) => {
			if (!(key in currentObject)) {
				currentObject[key] = cloneDeep(value);
				return;
			}

			const compareValue = currentObject[key];
			const compareSourceValue = currentSource[key];

			if (isObject(compareValue) && isObject(compareSourceValue)) {
				queue.push([compareValue, compareSourceValue]);
			} else {
				currentObject[key] = cloneDeep(currentSource[key]);
			}
		});
	}

	return object;
};
