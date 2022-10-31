import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import ReactiveForm, { useFormContext } from '../../src';

describe('ReactiveForm', () => {
	it('should render children as function', () => {
		const wrapper = ({ children }) => <ReactiveForm initialValues={{}}>{() => children}</ReactiveForm>;

		const { result } = renderHook(() => useFormContext(), { wrapper });

		expect(result.current).toBeDefined();
	});

	it('should render children as ReactNode', () => {
		const wrapper = ({ children }) => <ReactiveForm initialValues={{}}>{children}</ReactiveForm>;

		const { result } = renderHook(() => useFormContext(), { wrapper });

		expect(result.current).toBeDefined();
	});
});
