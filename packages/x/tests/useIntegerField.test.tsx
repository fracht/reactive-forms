import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook, waitFor } from '@testing-library/react';

import { defaultErrorMessages, IntegerFieldConfig, useIntegerField } from '../src/useIntegerField';

type Config = Omit<IntegerFieldConfig, 'name'> & {
	initialValue?: number | null;
};

const renderUseIntegerField = (config: Config = {}) => {
	const { initialValue = 0, ...initialProps } = config;

	const formBag = renderHook(() =>
		useForm({
			initialValues: {
				test: initialValue,
			},
		}),
	);

	const integerFieldBag = renderHook(
		(props: Omit<IntegerFieldConfig, 'name'>) =>
			useIntegerField({
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

	return [integerFieldBag, formBag] as const;
};

describe('Integer field', () => {
	it('Should format initial value correctly', () => {
		const [{ result: integerFieldBag }] = renderUseIntegerField();

		expect(integerFieldBag.current.text).toBe('0');
		expect(integerFieldBag.current.value).toBe(0);
	});

	// FIXME: enable this test after fixing useFieldValidator
	// it.skip('Should set validate field on initial render', async () => {
	// 	const [{ result: integerFieldBag }] = renderUseIntegerField({ required: true, initialValue: null });

	// 	expect(integerFieldBag.current.meta.error?.$error).toBe(
	// 		(defaultErrorMessages.lessThanMinValue as (min: number) => string)(1),
	// 	);
	// });

	it('Should set default error in case of conversion error and clear it afterwards', async () => {
		const [{ result: integerFieldBag }] = renderUseIntegerField();

		act(() => {
			integerFieldBag.current.onTextChange('0a');
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.invalidInput);
		});

		act(() => {
			integerFieldBag.current.onTextChange('0');
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set default error if text was not parsed successfully', async () => {
		const [{ result: integerFieldBag }] = renderUseIntegerField();

		act(() => {
			integerFieldBag.current.onTextChange('a');
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.invalidInput);
		});
	});

	it('Should set default error if field is required and empty', async () => {
		const [{ result: integerFieldBag }, { result: formBag }] = renderUseIntegerField({ required: true });

		act(() => {
			formBag.current.setFieldValue(formBag.current.paths.test, null);
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});
	});

	it('Should set default error if field value is less than min', async () => {
		const [{ result: integerFieldBag }, { result: formBag }] = renderUseIntegerField({ min: 0 });

		act(() => {
			formBag.current.setFieldValue(formBag.current.paths.test, -1);
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe(
				(defaultErrorMessages.lessThanMinValue as (min: number) => string)(0),
			);
		});
	});

	it('Should set default error if field value is more than max', async () => {
		const [{ result: integerFieldBag }, { result: formBag }] = renderUseIntegerField({ max: 0 });

		act(() => {
			formBag.current.setFieldValue(formBag.current.paths.test, 1);
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe(
				(defaultErrorMessages.moreThanMaxValue as (max: number) => string)(0),
			);
		});
	});

	it('Should set custom error in case of conversion error and clear it afterwards', async () => {
		const [{ result: integerFieldBag }] = renderUseIntegerField({ errorMessages: { invalidInput: 'custom' } });

		act(() => {
			integerFieldBag.current.onTextChange('0a');
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe('custom');
		});

		act(() => {
			integerFieldBag.current.onTextChange('0');
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set custom error if text was not parsed successfully', async () => {
		const [{ result: integerFieldBag }] = renderUseIntegerField({ errorMessages: { invalidInput: 'custom' } });

		act(() => {
			integerFieldBag.current.onTextChange('a');
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set custom error if field is required and empty', async () => {
		const [{ result: integerFieldBag }, { result: formBag }] = renderUseIntegerField({
			required: true,
			errorMessages: { required: 'custom' },
		});

		act(() => {
			formBag.current.setFieldValue(formBag.current.paths.test, null);
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set custom error if field value is less than min', async () => {
		const [{ result: integerFieldBag }, { result: formBag }] = renderUseIntegerField({
			min: 0,
			errorMessages: { lessThanMinValue: () => 'custom' },
		});

		act(() => {
			formBag.current.setFieldValue(formBag.current.paths.test, -1);
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set custom error if field value is more than max', async () => {
		const [{ result: integerFieldBag }, { result: formBag }] = renderUseIntegerField({
			max: 0,
			errorMessages: { moreThanMaxValue: () => 'custom' },
		});

		act(() => {
			formBag.current.setFieldValue(formBag.current.paths.test, 1);
		});

		await waitFor(() => {
			expect(integerFieldBag.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should be able to format integer differently', () => {
		const formatValue = jest.fn(() => 'custom');
		const initialValue = 42;
		const [{ result: integerFieldBag }] = renderUseIntegerField({ formatValue, initialValue });

		expect(integerFieldBag.current.text).toBe('custom');
		expect(formatValue).toBeCalledWith(initialValue);
	});
});
