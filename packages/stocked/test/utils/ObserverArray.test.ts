import { describe, expect, it, vi } from 'vitest';

import { ObserverArray } from '../../src/utils/ObserverArray';

describe('ObserverArray "call" function', () => {
	it('should call all functions', () => {
		const observer1 = vi.fn();

		const arr = new ObserverArray();
		arr.add(observer1);
		arr.add(observer1);
		arr.add(observer1);

		arr.call(null);

		expect(observer1).toBeCalledTimes(3);
	});

	it('should receive message', () => {
		const observer1 = vi.fn();
		const observer2 = vi.fn();
		const observer3 = vi.fn();

		const message = 'sample message';

		const arr = new ObserverArray();

		arr.add(observer1);
		arr.add(observer2);
		arr.add(observer3);

		arr.call(message);

		expect(observer1).toBeCalledWith(message);
		expect(observer2).toBeCalledWith(message);
		expect(observer3).toBeCalledWith(message);
	});
});

describe('ObserverArray "remove" function', () => {
	it('should remove observer', () => {
		const observer = vi.fn();
		const removedObserver = vi.fn();

		const arr = new ObserverArray();

		arr.add(observer);
		const key = arr.add(removedObserver);

		arr.remove(key);

		arr.call(null);

		expect(removedObserver).not.toBeCalled();
		expect(observer).toBeCalled();
	});
});

describe('ObserverArray "isEmpty" function', () => {
	it('should return true/false, depending on array size', () => {
		const observer = vi.fn();

		const arr = new ObserverArray();

		const key = arr.add(observer);

		expect(arr.isEmpty()).toBeFalsy();

		arr.remove(key);

		expect(arr.isEmpty()).toBeTruthy();
	});
});
