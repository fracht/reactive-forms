import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook, waitFor } from '@testing-library/react';

import { defaultErrorMessages, StringFieldConfig, useStringField } from '../src/useStringField';

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

	it('Should set default error if field is required and empty', async () => {
		const [{ result: stringFieldBag }] = renderUseStringField({ required: true });

		act(() => {
			stringFieldBag.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			stringFieldBag.current.control.setValue(undefined);
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			stringFieldBag.current.control.setValue('');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			stringFieldBag.current.control.setValue('   ');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			stringFieldBag.current.control.setValue('a');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set default error if value is longer than maxLength', async () => {
		const [{ result: stringFieldBag }] = renderUseStringField({ maxLength: 3 });

		act(() => {
			stringFieldBag.current.control.setValue('aaa');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBeUndefined();
		});

		act(() => {
			stringFieldBag.current.control.setValue('aaaa');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBe(
				(defaultErrorMessages.longerThanMaxLength as (maxLength: number) => string)(3),
			);
		});
	});

	it('Should set default error if value is shorter than minLength', async () => {
		const [{ result: stringFieldBag }] = renderUseStringField({ minLength: 3 });

		act(() => {
			stringFieldBag.current.control.setValue('aaa');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBeUndefined();
		});

		act(() => {
			stringFieldBag.current.control.setValue('aa');
		});

		await waitFor(() => {
			expect(stringFieldBag.current.meta.error?.$error).toBe(
				(defaultErrorMessages.shorterThanMinLength as (minLength: number) => string)(3),
			);
		});
	});
});
