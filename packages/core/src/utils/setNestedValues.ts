import isObject from 'lodash/isObject';

import { NestedObject } from '../typings/NestedObject';

export const setNestedValues = <Example extends object, Value>(
	exampleObject: Example,
	value: Value,
	visited: WeakMap<object, boolean> = new WeakMap(),
	output: NestedObject<Value, Example> = {} as NestedObject<Value, Example>,
): NestedObject<Value, Example> =>
	Object.keys(exampleObject).reduce<NestedObject<Value, Example>>((acc, key) => {
		const part = exampleObject[key];

		if (isObject(part)) {
			if (!visited.get(part)) {
				visited.set(part, true);
				acc[key] = Array.isArray(part) ? [] : {};
				acc[key] = Object.assign(acc[key], value);
				setNestedValues(part, value, visited, acc[key]);
			}
		} else {
			acc[key] = value;
		}

		return acc;
	}, output);
