import { loadingGuard } from '../../src/utils/loadingGuard';

describe('loadingGuard', () => {
	it('should return object, if it is loaded', () => {
		const object = {};

		expect(loadingGuard(object, true)).toBe(object);
	});

	it('should return proxy, if object not loaded', () => {
		const object = {};

		expect(loadingGuard(object, false)).not.toBe(object);
	});

	it('returned proxy should return functions, which throw errors', () => {
		const object = {
			fn: () => 'Normal function',
		};

		expect(() => loadingGuard(object, false).fn()).toThrow();
	});

	it('returned proxy should return objects, which throw errors', () => {
		const object = {
			obj: {
				a: 'asdf',
			},
		};

		const object_ = loadingGuard(object, false).obj;

		expect(() => object_.a).toThrow();
		expect(() => (object_['a'] = 'a')).toThrow();
		expect(() => 'a' in object_).toThrow();
		expect(() => delete object_.a).toThrow();
		expect(() => (object_['c'] = 'a')).toThrow();
		expect(() => Object.keys(object_)).toThrow();
	});

	it('returned proxy should return primitive value', () => {
		const object = {
			primitive: true,
		};

		expect(loadingGuard(object, false).primitive).toBe(true);
		expect(loadingGuard(object, false)['a']).toBe(undefined);
	});
});
