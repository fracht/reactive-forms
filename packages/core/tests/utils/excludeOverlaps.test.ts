import { cloneDeep } from 'lodash';

import { excludeOverlaps } from '../../src/utils/excludeOverlaps';

describe('excludeOverlaps', () => {
	it('should return empty object, when objects same', () => {
		let object: any = {
			d: {
				c: {
					h: 'asdf',
				},
			},
		};

		expect(
			excludeOverlaps(object, cloneDeep(object), {
				d: {
					c: {
						h: 'a',
					},
				},
			}),
		).toStrictEqual({});

		object = {
			h: {
				b: 'a',
			},
			c: new Date(),
		};

		expect(
			excludeOverlaps(object, cloneDeep(object), {
				b: 'asdf',
			}),
		).toStrictEqual({});
	});
	it('should return 1 object if values completely different', () => {
		const object = { a: 'Hello' };
		expect(excludeOverlaps({ a: { b: 0 } }, { a: { b: 1 } }, object)).toBe(object);
	});
	it('should remove equal parts', () => {
		expect(
			excludeOverlaps(
				{
					h: {
						b: 'a',
						c: 'a',
					},
				},
				{
					h: {
						b: 'a',
						c: 'b',
					},
				},
				{
					h: {
						b: {
							hello: 'asdf',
						},
						c: {
							hello: 'asdf',
						},
						hello: 'asdf',
					},
				},
			),
		).toStrictEqual({
			h: {
				c: {
					hello: 'asdf',
				},
				hello: 'asdf',
			},
		});
	});
});
