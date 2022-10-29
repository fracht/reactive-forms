import { cloneDeep } from 'lodash';

import { excludeOverlaps } from '../../src/utils/excludeOverlaps';

describe('excludeOverlaps', () => {
	it('should return empty object, when objects same', () => {
		let obj: any = {
			d: {
				c: {
					h: 'asdf',
				},
			},
		};

		expect(
			excludeOverlaps(obj, cloneDeep(obj), {
				d: {
					c: {
						h: 'a',
					},
				},
			}),
		).toStrictEqual({});

		obj = {
			h: {
				b: 'a',
			},
			c: new Date(),
		};

		expect(
			excludeOverlaps(obj, cloneDeep(obj), {
				b: 'asdf',
			}),
		).toStrictEqual({});
	});
	it('should return 1 object if values completely different', () => {
		const obj = { a: 'Hello' };
		expect(excludeOverlaps({ a: { b: 0 } }, { a: { b: 1 } }, obj)).toBe(obj);
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
