import cloneDeep from 'lodash/cloneDeep.js';
import isObject from 'lodash/isObject.js';

export const overrideMerge = (object: object, source: object) => {
	object = cloneDeep(object);

	const queue = [[object, source]];

	while (queue.length) {
		const [currentObject, currentSource] = queue.shift()!;

		Object.entries(currentSource).forEach(([key, value]) => {
			if (!(key in currentObject)) {
				(currentObject as Record<string, unknown>)[key] = cloneDeep(value);
				return;
			}

			const compareValue = (currentObject as Record<string, unknown>)[key];
			const compareSourceValue = (currentSource as Record<string, unknown>)[key];

			if (isObject(compareValue) && isObject(compareSourceValue)) {
				queue.push([compareValue, compareSourceValue]);
			} else {
				(currentObject as Record<string, unknown>)[key] = cloneDeep(
					(currentSource as Record<string, unknown>)[key],
				);
			}
		});
	}

	return object;
};
