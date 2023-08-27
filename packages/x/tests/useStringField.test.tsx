import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook, waitFor } from '@testing-library/react';

import { StringFieldConfig, useStringField } from '../src/useStringField';

type Config = Omit<StringFieldConfig, 'name'> & {
	initialValue?: string;
};

const renderUseStringField = (config: Config = {}) => {
	const { initialValue = '', ...initialProps } = config;

	const formBag = renderHook(() =>
		useForm({
			initialValues: {
				test: initialValue,
			},
		}),
	);

	const stringFieldBag = renderHook(
		(props: Omit<StringFieldConfig, 'name'>) =>
			useStringField({
				name: formBag.result.current.paths.test,
				...props,
			}),
		{
			wrapper: ({ children }) => (
				<ReactiveFormProvider formBag={formBag.result.current}>{children}</ReactiveFormProvider>
			),
			initialProps,
		},
	);

	return [stringFieldBag, formBag] as const;
};

describe('String field', () => {
	it('Should set touched=true on blur', async () => {
		const [{ result }] = renderUseStringField();

		await act(() => {
			result.current.onBlur();
		});

		await waitFor(() => {
			expect(result.current.meta.touched?.$touched).toBeTruthy();
		});
	});
});
