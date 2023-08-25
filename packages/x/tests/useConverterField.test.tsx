import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook } from '@testing-library/react';

import { ConversionError, useConverterField } from '../src/useConverterField';

const defaultParse = (text: string) => {
	const parsingResult = Number.parseInt(text);

	if (Number.isNaN(parsingResult)) {
		throw new ConversionError('hello');
	}

	return parsingResult;
};

const renderUseConverterField = (parse: (value: string) => number = defaultParse) => {
	const { result: formBag } = renderHook(() =>
		useForm({
			initialValues: {
				test: 0,
			},
		}),
	);

	const { result: converterFieldBag } = renderHook(
		() =>
			useConverterField<number>({
				parse,
				format: (value) => String(value),
				name: formBag.current.paths.test,
			}),
		{
			wrapper: ({ children }) => (
				<ReactiveFormProvider formBag={formBag.current}>{children}</ReactiveFormProvider>
			),
		},
	);

	return {
		formBag,
		converterFieldBag,
	};
};

describe('Converter field', () => {
	it('Should update field with valid value', async () => {
		const { converterFieldBag } = renderUseConverterField();
		const { onTextChange } = converterFieldBag.current;

		expect(converterFieldBag.current.value).toBe(0);
		expect(converterFieldBag.current.text).toBe('0');

		await act(async () => {
			await onTextChange('1');
		});

		expect(converterFieldBag.current.value).toBe(1);
		expect(converterFieldBag.current.text).toBe('1');
	});

	it('Should set an error if conversion fails', async () => {
		const { converterFieldBag } = renderUseConverterField();
		const { onTextChange } = converterFieldBag.current;

		await act(async () => {
			await onTextChange('a');
		});

		expect(converterFieldBag.current.meta.error?.$error).toBe('hello');
		expect(converterFieldBag.current.value).toBe(0);
		expect(converterFieldBag.current.text).toBe('a');
	});

	it('Should update text when form value changes', async () => {
		const { converterFieldBag, formBag } = renderUseConverterField();

		const { paths } = formBag.current;

		await act(async () => {
			await formBag.current.setFieldValue(paths.test, 1);
		});

		expect(converterFieldBag.current.value).toBe(1);
		expect(converterFieldBag.current.text).toBe('1');
	});

	it('Should clear conversion error', async () => {
		const { converterFieldBag } = renderUseConverterField();

		const { onTextChange } = converterFieldBag.current;

		await act(async () => {
			await onTextChange('a');
		});

		expect(converterFieldBag.current.meta.error?.$error).toBe('hello');

		await act(async () => {
			await onTextChange('1');
		});

		expect(converterFieldBag.current.meta.error?.$error).toBeUndefined();
		expect(converterFieldBag.current.value).toBe(1);
		expect(converterFieldBag.current.text).toBe('1');
	});

	it('Should rethrow an error in case it is not ConversionError', () => {
		const { converterFieldBag } = renderUseConverterField(() => {
			throw new Error('custom');
		});

		act(() => {
			expect(() => converterFieldBag.current.onTextChange('')).toThrow();
		});
	});

	it('Should not update text if there are some conversion errors', async () => {
		const { converterFieldBag, formBag } = renderUseConverterField();
		const { onTextChange } = converterFieldBag.current;
		const { setFieldValue, paths } = formBag.current;

		await act(async () => {
			await onTextChange('a');
		});

		await act(async () => {
			await setFieldValue(paths.test, 1);
		});

		expect(converterFieldBag.current.value).toBe(1);
		expect(converterFieldBag.current.text).toBe('a');
	});

	it('Should return error from validator', async () => {
		const { converterFieldBag, formBag } = renderUseConverterField();

		const { onTextChange } = converterFieldBag.current;
		const { validateForm, values } = formBag.current;

		await act(async () => {
			await onTextChange('a');
		});

		const errors = await validateForm(values.getValues());

		expect(errors.test?.$error).toBe('hello');
	});
});
