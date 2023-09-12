import React, { PropsWithChildren } from 'react';
import { act, renderHook, RenderHookResult, waitFor } from '@testing-library/react';
import { createPxth, Pxth } from 'pxth';

import { FieldContext, FormConfig, FormShared, ReactiveFormProvider, useField, useForm } from '../../src';

const renderField = <V, T extends object>(
	name: Pxth<V>,
	config: FormConfig<T>,
): RenderHookResult<FieldContext<V>, undefined> => {
	const {
		result: { current: bag },
	} = renderHook(() => useForm(config));

	const wrapper = ({ children }: PropsWithChildren) => (
		<ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{children}</ReactiveFormProvider>
	);

	return renderHook(() => useField<V>({ name }), { wrapper });
};

const config = {
	initialValues: {
		test: 'hello',
	},
	// TODO: initial errors doesn't make sense because it is derived state from values
	initialErrors: {
		test: {
			$error: 'error',
		},
	},
	initialTouched: {
		test: {
			$touched: true,
		},
	},
};

describe('useField', () => {
	it('should return correct value', () => {
		const { result } = renderField<string, { test: string }>(createPxth(['test']), config);
		expect(result.current.value).toBe('hello');
	});

	it('should return correct error', () => {
		const { result } = renderField<string, { test: string }>(createPxth(['test']), config);
		expect(result.current.meta.error?.$error).toBe('error');
	});

	it('should return correct touched', () => {
		const { result } = renderField<string, { test: string }>(createPxth(['test']), config);
		expect(result.current.meta.touched?.$touched).toBe(true);
	});

	it('should setValue', async () => {
		const { result } = renderField<string, { test: string }>(createPxth(['test']), config);

		await act(async () => {
			await result.current.control.setValue('modified');
		});

		expect(result.current.value).toBe('modified');
	});

	it('should setTouched', async () => {
		const { result } = renderField<string, { test: string }>(createPxth(['test']), config);

		await act(async () => {
			await result.current.control.setTouched({ $touched: false });
		});

		expect(result.current.meta.touched?.$touched).toBe(false);
	});

	it.only('should setError', async () => {
		const { result } = renderField<string, { test: string }>(createPxth(['test']), config);

		act(() => {
			result.current.control.setError({ $error: 'modified error' });
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('modified error');
		});
	});
});
