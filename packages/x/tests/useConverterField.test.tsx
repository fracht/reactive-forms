import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook } from '@testing-library/react';

import { ConversionError, useConverterField } from '../src/useConverterField';

const renderUseConverterField = () => {
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
				parse: (text) => {
					const parsingResult = Number.parseInt(text);

					if (Number.isNaN(parsingResult)) {
						throw new ConversionError('hello');
					}

					return parsingResult;
				},
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

	it('Should update text when form value changes', async () => {});
});