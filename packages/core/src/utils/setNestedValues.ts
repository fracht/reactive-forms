import isObject from 'lodash/isObject';

import { NestedObject } from '../typings/NestedObject';

export const setNestedValues = <Example extends Record<string, unknown>, Value>(
	exampleObject: Example,
	value: Value,
	visited: WeakMap<object, boolean> = new WeakMap(),
	output: NestedObject<Value, Example> = {} as NestedObject<Value, Example>,
): NestedObject<Value, Example> =>
	Object.keys(exampleObject).reduce((acc, key) => {
		const part = exampleObject[key];

		if (isObject(part)) {
			if (!visited.get(part)) {
				visited.set(part, true);
				acc[key] = Array.isArray(part) ? [] : {};
				acc[key] = Object.assign(acc[key], value);
				setNestedValues(part as Record<string, unknown>, value, visited, acc[key]);
			}
		} else {
			acc[key] = value;
		}

		return acc;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, output as Record<string, any>) as NestedObject<Value, Example>;
