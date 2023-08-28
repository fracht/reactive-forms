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
		const [{ result }] = renderUseStringField({ required: true });

		act(() => {
			result.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			result.current.control.setValue(undefined);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			result.current.control.setValue('');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			result.current.control.setValue('   ');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});

		act(() => {
			result.current.control.setValue('a');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set default error if value is longer than maxLength', async () => {
		const [{ result }] = renderUseStringField({ maxLength: 3 });

		act(() => {
			result.current.control.setValue('aaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		act(() => {
			result.current.control.setValue('aaaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.longerThanMaxLength(3));
		});
	});

	it('Should set default error if value is shorter than minLength', async () => {
		const [{ result }] = renderUseStringField({ minLength: 3 });

		act(() => {
			result.current.control.setValue('aaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		act(() => {
			result.current.control.setValue('aa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.shorterThanMinLength(3));
		});
	});

	it('Should set custom error if field is required and empty', async () => {
		const [{ result }] = renderUseStringField({
			required: true,
			errorMessages: {
				required: 'custom',
			},
		});

		act(() => {
			result.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});

		act(() => {
			result.current.control.setValue(undefined);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});

		act(() => {
			result.current.control.setValue('');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});

		act(() => {
			result.current.control.setValue('   ');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});

		act(() => {
			result.current.control.setValue('a');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set custom error if value is longer than maxLength', async () => {
		const [{ result }] = renderUseStringField({
			maxLength: 3,
			errorMessages: { longerThanMaxLength: () => 'custom' },
		});

		act(() => {
			result.current.control.setValue('aaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		act(() => {
			result.current.control.setValue('aaaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set custom error if value is shorter than minLength', async () => {
		const [{ result }] = renderUseStringField({
			minLength: 3,
			errorMessages: {
				shorterThanMinLength: () => 'custom',
			},
		});

		act(() => {
			result.current.control.setValue('aaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		act(() => {
			result.current.control.setValue('aa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set formatted value in form state on blur', async () => {
		const [{ result }] = renderUseStringField({
			formatter: (value) => `+${value}`,
			initialValue: 'hello',
		});

		await act(() => {
			result.current.onBlur();
		});

		await waitFor(() => {
			expect(result.current.value).toBe('+hello');
		});
	});
});
