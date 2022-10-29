import { deepRemoveEmpty } from '../../src/utils/deepRemoveEmpty';

describe('deepRemoveEmpty', () => {
	it('should filter array', () => {
		expect(deepRemoveEmpty([undefined, null, void 0, '', [], {}, [[[]]], 'NOT EMPTY!'])).toStrictEqual([
			undefined,
			undefined,
			undefined,
			'',
			undefined,
			undefined,
			undefined,
			'NOT EMPTY!',
		]);
		expect(deepRemoveEmpty([undefined, null])).toBe(undefined);
		expect(deepRemoveEmpty([])).toBe(undefined);
	});

	it('should handle nulls', () => {
		expect(deepRemoveEmpty(null)).toBe(undefined);
	});

	it('should shake objects', () => {
		expect(
			deepRemoveEmpty({
				a: null,
				b: {
					c: {
						d: undefined,
					},
				},
				arr: [null, undefined, void 0],
			}),
		).toBe(undefined);

		expect(
			deepRemoveEmpty({
				asdf: ['a'],
				b: {
					c: {
						d: null,
					},
					e: undefined,
				},
				e: {
					hello: {
						a: 'asdf',
					},
				},
			}),
		).toStrictEqual({
			asdf: ['a'],
			e: {
				hello: {
					a: 'asdf',
				},
			},
		});
	});

	it('should keep all properties of arrays', () => {
		const arrayWithProperties: any = [12, undefined];

		arrayWithProperties.$error = 'test1';
		arrayWithProperties.anyValue = 'test2';

		const values = {
			arr: arrayWithProperties,
		};

		const newArray: any = [12, undefined];
		newArray.$error = 'test1';
		newArray.anyValue = 'test2';

		expect(deepRemoveEmpty(values)).toStrictEqual({ arr: newArray });
	});
});
