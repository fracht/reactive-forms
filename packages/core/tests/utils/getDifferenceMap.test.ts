import { RootPathToken } from 'pxth';

import { getDifferenceMap } from '../../src/utils/getDifferenceMap';

describe('getDifferenceMap', () => {
	it('should return map when objects are same', () => {
		let object: any = {
			hello: 'a',
		};

		const equalityOutput = {
			[RootPathToken]: true,
		};

		expect(getDifferenceMap(object, object)).toStrictEqual(equalityOutput);

		object = {
			h: {
				c: {
					d: 'a',
				},
			},
			f: 'b',
		};

		expect(getDifferenceMap(object, object)).toStrictEqual(equalityOutput);

		object = {
			arr: [0, 1, 2, 3],
			arr2: [
				{
					h: 'a',
				},
				{
					b: 'b',
				},
				{
					c: new Date(),
				},
			],
		};

		expect(getDifferenceMap(object, object)).toStrictEqual(equalityOutput);

		expect(getDifferenceMap({}, {})).toStrictEqual(equalityOutput);

		expect(getDifferenceMap({ h: {} }, { h: {} })).toStrictEqual(equalityOutput);
	});

	it('should return diff map', () => {
		expect(
			getDifferenceMap(
				{
					h: 'a',
				},
				{
					h: 'b',
				},
			),
		).toStrictEqual({ [RootPathToken]: false });

		expect(
			getDifferenceMap(
				{
					h: 'b',
					c: {
						a: 'h',
					},
				},
				{
					h: 'b',
					c: {
						a: 'b',
					},
				},
			),
		).toStrictEqual({ h: true, c: false });

		expect(
			getDifferenceMap(
				{
					h: 'b',
					h_a: 'c',
					c: {
						a: 'h',
					},
				},
				{
					h: 'b',
					h_a: 'b',
					c: {
						a: 'b',
					},
				},
			),
		).toStrictEqual({ h_a: false, h: true, c: false });

		expect(
			getDifferenceMap(
				{
					h: 'b',
					c: {
						a: 'h',
						d: 'a',
					},
				},
				{
					h: 'b',
					c: {
						a: 'b',
						d: 'a',
					},
				},
			),
		).toStrictEqual({ h: true, 'c.a': false, 'c.d': true });
	});

	it('should return diff with empty object', () => {
		expect(
			getDifferenceMap(
				{},
				{
					h: 'b',
				},
			),
		).toStrictEqual({ [RootPathToken]: false });

		expect(
			getDifferenceMap(
				{
					h: 'b',
				},
				{},
			),
		).toStrictEqual({ [RootPathToken]: false });

		expect(getDifferenceMap({}, {})).toStrictEqual({ [RootPathToken]: true });
	});

	it('complex case', () => {
		expect(
			getDifferenceMap(
				{
					date_from: {
						from: null,
						to: null,
					},
					date_to: {
						from: null,
						to: null,
					},
					ord_no: '',
					customer_name: '',
					supplier_name: '',
					ord_date: {
						from: null,
						to: null,
					},
					status: '',
					sys: '',
					'': 'ALL',
				},
				{
					date_from: {
						from: null,
						to: null,
					},
					date_to: {
						from: null,
						to: null,
					},
					ord_no: '',
					customer_name: '',
					supplier_name: '',
					ord_date: {
						from: null,
						to: null,
					},
					status: '',
					sys: '',
				},
			),
		);
	});
});
