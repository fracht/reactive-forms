import React, { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react';

import { ReactiveFormProvider, useForm, useFormContext } from '../../src';

describe('ReactiveFormProvider', () => {
	it('should pass context to children', () => {
		const { result: formBagResult } = renderHook(() => useForm({ initialValues: {} }));

		const wrapper = ({ children }: PropsWithChildren) => (
			<ReactiveFormProvider formBag={formBagResult.current}>{() => children}</ReactiveFormProvider>
		);

		const { result } = renderHook(() => useFormContext(), { wrapper });

		expect(result.current).toBe(formBagResult.current);
	});

	it('should not render children while form is not loaded', () => {
		const { result: formBagResult } = renderHook(() => useForm({ initialValues: {} }));

		const { queryByText } = render(
			<ReactiveFormProvider formBag={{ ...formBagResult.current, isLoaded: false }}>
				{() => <div>children</div>}
			</ReactiveFormProvider>,
		);

		expect(queryByText('children')).toBe(null);
	});
});
