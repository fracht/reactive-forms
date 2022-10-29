import { cloneDeep } from 'lodash';

import { overrideMerge } from '../../src/utils/overrideMerge';

describe('overrideMerge', () => {
	it('should merge source into object', () => {
		expect(
			overrideMerge({ hello: [{ name: 'Hello' }, { name: 'World' }] }, { hello: [{ age: 10 }, { age: 20 }] }),
		).toStrictEqual({
			hello: [
				{ name: 'Hello', age: 10 },
				{ name: 'World', age: 20 },
			],
		});
	});

	it('should override values', () => {
		expect(overrideMerge({ value: 'asdf' }, { value: undefined })).toStrictEqual({
			value: undefined,
		});
	});

	it('should not mutate arguments', () => {
		const object1 = {
			hello: {
				asdf: 'hello',
			},
		};
		const object2 = {
			hello: {
				d: 'aaa',
			},
		};

		const test1 = cloneDeep(object1);
		const test2 = cloneDeep(object2);

		overrideMerge(object1, object2);

		expect(object1).toStrictEqual(test1);
		expect(object2).toStrictEqual(test2);
	});
});
