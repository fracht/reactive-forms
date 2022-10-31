import { setNestedValues } from '../../src/utils/setNestedValues';

describe('setNestedValues', () => {
	it('should set nested values', () => {
		const newValues = setNestedValues(
			{
				a: 'asdf',
			},
			{
				t: true,
			},
		);

		expect(newValues).toStrictEqual({
			a: {
				t: true,
			},
		});
	});

	it('should set nested object values', () => {
		const newValues = setNestedValues(
			{
				a: {
					b: {
						a: '',
					},
					c: '',
				},
			},
			{
				t: true,
			},
		);

		expect(newValues).toStrictEqual({
			a: {
				t: true,
				b: {
					t: true,
					a: {
						t: true,
					},
				},
				c: {
					t: true,
				},
			},
		});
	});

	it('should set nested values with arrays', () => {
		const newValues = setNestedValues(
			{
				a: 'asdf',
				b: [0, 1, 2],
			},
			{
				t: true,
			},
		);

		const obj = {
			a: {
				t: true,
			},
			b: [
				{
					t: true,
				},
				{
					t: true,
				},
				{
					t: true,
				},
			],
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(obj.b as any).t = true;

		expect(newValues).toStrictEqual(obj);
	});

	it('should set circular values', () => {
		const values = {
			a: {
				b: '',
			},
		};

		values.a.b = values.a as unknown as string;

		const newValues = setNestedValues(values, {
			t: true,
		});

		const shouldBe = {
			a: {
				t: true,
			},
		};

		expect(newValues).toStrictEqual(shouldBe);
	});
});
