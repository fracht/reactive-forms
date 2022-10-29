import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { ReactiveFormProvider, useForm, useFormContext } from '../../src';

describe('ReactiveFormProvider', () => {
	it('should pass context to children', () => {
		const { result: formBagResult } = renderHook(() => useForm({ initialValues: {} }));

		const wrapper = ({ children }) => (
			<ReactiveFormProvider formBag={formBagResult.current}>{() => children}</ReactiveFormProvider>
		);

		const { result } = renderHook(() => useFormContext(), { wrapper });

		expect(result.current).toBe(formBagResult.current);
	});

	it('should not render children while form is not loaded', () => {
		const { result: formBagResult } = renderHook(() => useForm({ initialValues: {} }));

		const wrapper = ({ children }) => (
			<ReactiveFormProvider formBag={{ ...formBagResult.current, isLoaded: false }}>
				{() => children}
			</ReactiveFormProvider>
		);

		const { result } = renderHook(() => useFormContext(), { wrapper });

		expect(result.current).toBe(undefined);
	});
});
