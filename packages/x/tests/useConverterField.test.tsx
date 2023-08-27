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

const defaultFormat = (value: number) => String(value);

type Config = {
	parse?: (value: string) => number;
	format?: (value: number) => string;
};

const renderUseConverterField = (config: Config = {}) => {
	const { parse = defaultParse, format = defaultFormat } = config;

	const formBag = renderHook(() =>
		useForm({
			initialValues: {
				test: 0,
			},
		}),
	);

	type Props = Required<Config>;

	const converterFieldBag = renderHook(
		({ format, parse }: Props) =>
			useConverterField<number>({
				parse,
				format,
				name: formBag.result.current.paths.test,
			}),
		{
			wrapper: ({ children }) => (
				<ReactiveFormProvider formBag={formBag.result.current}>{children}</ReactiveFormProvider>
			),
			initialProps: {
				format,
				parse,
			},
		},
	);

	return {
		formBag,
		converterFieldBag,
	};
};

describe('Converter field', () => {
	it('Should update field with valid value', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
		} = renderUseConverterField();
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
		const {
			converterFieldBag: { result: converterFieldBag },
		} = renderUseConverterField();
		const { onTextChange } = converterFieldBag.current;

		await act(async () => {
			await onTextChange('a');
		});

		expect(converterFieldBag.current.meta.error?.$error).toBe('hello');
		expect(converterFieldBag.current.value).toBe(0);
		expect(converterFieldBag.current.text).toBe('a');
	});

	it('Should clear conversion error', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
		} = renderUseConverterField();

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

	it('Should update text when form value changes (field is not focused)', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
			formBag: { result: formBag },
		} = renderUseConverterField();

		const { paths } = formBag.current;

		await act(async () => {
			await formBag.current.setFieldValue(paths.test, 1);
		});

		expect(converterFieldBag.current.value).toBe(1);
		expect(converterFieldBag.current.text).toBe('1');
	});

	it('Should not update text when field is focused and set old value when field is blurred', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
			formBag: { result: formBag },
		} = renderUseConverterField();

		const { onFocus, onBlur } = converterFieldBag.current;
		const { setFieldValue, paths } = formBag.current;

		await act(async () => {
			await onFocus();
		});

		await act(async () => {
			await setFieldValue(paths.test, 1);
		});

		expect(converterFieldBag.current.text).toBe('0');
		expect(converterFieldBag.current.value).toBe(1);

		await act(async () => {
			await onBlur();
		});

		expect(converterFieldBag.current.text).toBe('0');
		expect(converterFieldBag.current.value).toBe(0);
	});

	it('Should rethrow an error in case it is not ConversionError', () => {
		const {
			converterFieldBag: { result: converterFieldBag },
		} = renderUseConverterField({
			parse: () => {
				throw new Error('custom');
			},
		});

		act(() => {
			expect(() => converterFieldBag.current.onTextChange('')).toThrow();
		});
	});

	it('Should not update text if there are some conversion errors', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
			formBag: { result: formBag },
		} = renderUseConverterField();
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
		const {
			converterFieldBag: { result: converterFieldBag },
			formBag: { result: formBag },
		} = renderUseConverterField();

		const { onTextChange } = converterFieldBag.current;
		const { validateForm, values } = formBag.current;

		await act(async () => {
			await onTextChange('a');
		});

		const errors = await validateForm(values.getValues());

		expect(errors.test?.$error).toBe('hello');
	});

	it('Should set field touched=true on blur', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
		} = renderUseConverterField();

		const { onBlur } = converterFieldBag.current;

		await act(async () => {
			await onBlur();
		});

		expect(converterFieldBag.current.meta.touched?.$touched).toBe(true);
	});

	it('Should set value both in form state and local text state when focused if using `setValue` callback from hook bag', async () => {
		const {
			converterFieldBag: { result: converterFieldBag },
		} = renderUseConverterField();

		const {
			control: { setValue },
			onFocus,
		} = converterFieldBag.current;

		await act(async () => {
			await onFocus();
		});

		await act(async () => {
			await setValue(1);
		});

		expect(converterFieldBag.current.value).toBe(1);
		expect(converterFieldBag.current.text).toBe('1');
	});

	it('Should reformat value when format function changes', () => {
		const { converterFieldBag } = renderUseConverterField();

		const format = jest.fn(() => 'test');

		expect(converterFieldBag.result.current.text).toBe('0');

		act(() => {
			converterFieldBag.rerender({ format, parse: defaultParse });
		});

		expect(format).toBeCalled();
		expect(converterFieldBag.result.current.text).toBe('test');
	});

	it('Should parse text again when parse function changes', () => {
		const { converterFieldBag } = renderUseConverterField();

		const parse = jest.fn(() => 1);

		expect(converterFieldBag.result.current.value).toBe(0);

		act(() => {
			converterFieldBag.rerender({ format: defaultFormat, parse });
		});

		expect(parse).toBeCalled();
		expect(converterFieldBag.result.current.value).toBe(1);
	});
});
