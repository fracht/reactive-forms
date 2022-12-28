import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';

import ReactiveForm, { useFormContext } from '../../src';

describe('ReactiveForm', () => {
	it('should render children in Form context', () => {
		const wrapper = ({ children }: PropsWithChildren) => <ReactiveForm initialValues={{}}>{children}</ReactiveForm>;

		const { result } = renderHook(() => useFormContext(), { wrapper });

		expect(result.current).toBeDefined();
	});
});
