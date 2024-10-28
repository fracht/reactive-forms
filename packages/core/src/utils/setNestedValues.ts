import isObject from 'lodash/isObject';

import { NestedObject } from '../typings/NestedObject';

export const setNestedValues = <Example extends object, Value>(
	exampleObject: Example,
	value: Value,
	visited: WeakMap<object, boolean> = new WeakMap(),
	output: NestedObject<Value, Example> = {} as NestedObject<Value, Example>,
): NestedObject<Value, Example> =>
	Object.keys(exampleObject).reduce<NestedObject<Value, Example>>((acc, key) => {
		const part = (exampleObject as Record<string, unknown>)[key];

		if (isObject(part)) {
			if (!visited.get(part)) {
				visited.set(part, true);
				(acc as Record<string, unknown>)[key] = Array.isArray(part) ? [] : {};
				(acc as Record<string, unknown>)[key] = Object.assign((acc as Record<string, object>)[key], value);
				setNestedValues(part, value, visited, (acc as Record<string, (object & Value) | undefined>)[key]);
			}
		} else {
			(acc as Record<string, unknown>)[key] = value;
		}

		return acc;
	}, output);
