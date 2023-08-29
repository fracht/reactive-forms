import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook, waitFor } from '@testing-library/react';

import {
	DateFieldConfig,
	defaultErrorMessages,
	defaultFormatOptions,
	defaultLocales,
	useDateField,
} from '../src/useDateField';

type Config = Omit<DateFieldConfig, 'name'> & {
	initialValue?: Date | null;
};

const renderUseDateField = (config: Config = {}) => {
	const { initialValue = null, ...initialProps } = config;

	const formBag = renderHook(() =>
		useForm({
			initialValues: {
				test: initialValue,
			},
		}),
	);

	const dateFieldBag = renderHook(
		(props: Omit<DateFieldConfig, 'name'>) =>
			useDateField({
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

	return [dateFieldBag, formBag] as const;
};

describe('Date field', () => {
	it.skip('Should format initial value correctly', () => {
		const initialValue = new Date();

		const [{ result }] = renderUseDateField({ initialValue });

		expect(result.current.text).toBe(initialValue.toLocaleString(defaultLocales, defaultFormatOptions));
		expect(result.current.value?.getTime()).toBe(initialValue.getTime());
	});

	it('Should set default conversion error correctly', async () => {
		const [{ result }] = renderUseDateField();

		await act(() => {
			result.current.onTextChange('2000-20-20');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.invalidInput);
		});

		await act(() => {
			result.current.onTextChange('aaaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.invalidInput);
		});

		await act(() => {
			result.current.onTextChange('1000');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.invalidInput);
		});

		await act(() => {
			result.current.onTextChange('2003-07-08');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		await act(() => {
			result.current.onTextChange('');
		});

		await waitFor(() => {
			expect(result.current.value).toBe(null);
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		await act(() => {
			result.current.onTextChange('     ');
		});

		await waitFor(() => {
			expect(result.current.value).toBe(null);
			expect(result.current.text).toBe('     ');
			expect(result.current.meta.error?.$error).toBeUndefined();
		});

		await act(() => {
			result.current.onTextChange('1999/12/12');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it.skip('Should set default error if field is required and empty', async () => {
		const [{ result }] = renderUseDateField({ required: true });

		act(() => {
			result.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.required);
		});
	});

	it.skip('Should set default error if date is earlier than minDate', async () => {
		const minDate = new Date(2000, 0, 5);
		const [{ result }] = renderUseDateField({ minDate });

		await act(() => {
			result.current.control.setValue(new Date(2000, 0, 4));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.earlierThanMinDate(minDate));
		});

		await act(() => {
			result.current.control.setValue(new Date(2000, 0, 6));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it.skip('Should set default error if date is later than maxDate', async () => {
		const maxDate = new Date(2000, 0, 5);
		const [{ result }] = renderUseDateField({ maxDate });

		act(() => {
			result.current.control.setValue(new Date(2000, 0, 6));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultErrorMessages.laterThanMaxDate(maxDate));
		});

		await act(() => {
			result.current.control.setValue(new Date(2000, 0, 4));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it.skip('Should set custom conversion error correctly', async () => {
		const [{ result }] = renderUseDateField({
			errorMessages: {
				invalidInput: 'custom',
			},
		});

		await act(() => {
			result.current.onTextChange('2000-20-20');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});

		await act(() => {
			result.current.onTextChange('aaaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});

		await act(() => {
			result.current.onTextChange('1000');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	it.skip('Should set custom error if field is required and empty', async () => {
		const [{ result }] = renderUseDateField({
			required: true,
			errorMessages: { required: 'custom' },
		});

		act(() => {
			result.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	// it.skip('Should set custom error if field value is less than min', async () => {
	// 	const [{ result }] = renderUseDateField({
	// 		min: 0.5,
	// 		errorMessages: { lessThanMinValue: () => 'custom' },
	// 	});

	// 	act(() => {
	// 		result.current.control.setValue(0.25);
	// 	});

	// 	await waitFor(() => {
	// 		expect(result.current.meta.error?.$error).toBe('custom');
	// 	});
	// });

	// it.skip('Should set custom error if field value is more than max', async () => {
	// 	const [{ result }] = renderUseDateField({
	// 		max: 0.5,
	// 		errorMessages: { moreThanMaxValue: () => 'custom' },
	// 	});

	// 	act(() => {
	// 		result.current.control.setValue(0.75);
	// 	});

	// 	await waitFor(() => {
	// 		expect(result.current.meta.error?.$error).toBe('custom');
	// 	});
	// });

	// it.skip('Should be able to format decimal differently', () => {
	// 	const formatValue = jest.fn(() => 'custom');
	// 	const initialValue = 3.14;
	// 	const [{ result }] = renderUseDateField({ formatValue, initialValue });

	// 	expect(result.current.text).toBe('custom');
	// 	expect(formatValue).toBeCalledWith(initialValue);
	// });

	// it.skip('Should call custom parseDecimal function', async () => {
	// 	const parseDecimal = jest.fn();

	// 	const [{ result }] = renderUseDateField({ parseDecimal });

	// 	await act(() => {
	// 		result.current.onTextChange('0.0');
	// 	});

	// 	await waitFor(() => {
	// 		expect(parseDecimal).toBeCalledWith('0.0');
	// 	});
	// });
});
