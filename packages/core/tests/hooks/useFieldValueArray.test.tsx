import React, { PropsWithChildren } from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { createPxth } from 'pxth';

import {
	FieldValueArrayConfig,
	FormConfig,
	FormShared,
	ReactiveFormProvider,
	useFieldValueArray,
	useForm,
} from '../../src';

const renderFieldValueArray = <V extends Record<string, unknown>, T extends Record<string, unknown>>(
	paths: FieldValueArrayConfig<V>,
	config: FormConfig<T>,
): [RenderHookResult<V, undefined>, FormShared<T>] => {
	const {
		result: { current: bag },
	} = renderHook(() => useForm(config));

	const wrapper = ({ children }: PropsWithChildren) => (
		<ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{children}</ReactiveFormProvider>
	);

	return [renderHook(() => useFieldValueArray<V>(paths), { wrapper }), bag];
};

describe('useField', () => {
	it('should return object of specified values', () => {
		const [{ result }, { setFieldValue }] = renderFieldValueArray(
			{
				a: createPxth(['hello']),
				b: createPxth(['b', 'c', 'e']),
				c: createPxth(['d']),
			},
			{
				initialValues: {
					hello: 'asdf',
					b: {
						c: {
							e: 'bbbb',
						},
					},
					d: {
						a: 'hello',
					},
				},
			},
		);

		expect(result.current).toStrictEqual({
			a: 'asdf',
			b: 'bbbb',
			c: {
				a: 'hello',
			},
		});

		act(() => {
			setFieldValue(createPxth(['hello']), 'asdfasdf');
			setFieldValue(createPxth(['b', 'c']), { e: 'ggg' });
			setFieldValue(createPxth(['d', 'c', 'd']), 'aa');
		});

		expect(result.current).toStrictEqual({
			a: 'asdfasdf',
			b: 'ggg',
			c: {
				a: 'hello',
				c: {
					d: 'aa',
				},
			},
		});
	});
});
