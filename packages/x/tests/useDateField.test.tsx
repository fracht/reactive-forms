import React from 'react';
import { ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook, waitFor } from '@testing-library/react';

import { DateFieldI18n, DateFieldI18nContextProvider, defaultDateFieldI18n } from '../src/DateFieldI18n';
import { formatDate } from '../src/formatDate';
import { DateFieldConfig, useDateField } from '../src/useDateField';

type Config = Omit<DateFieldConfig, 'name'> & {
	initialValue?: Date | null;
	i18n?: Partial<DateFieldI18n>;
};

const renderUseDateField = (config: Config = {}) => {
	const { initialValue = null, i18n, ...initialProps } = config;

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
				<ReactiveFormProvider formBag={formBag.result.current}>
					<DateFieldI18nContextProvider i18n={i18n}>{children}</DateFieldI18nContextProvider>
				</ReactiveFormProvider>
			),
			initialProps,
		},
	);

	return [dateFieldBag, formBag] as const;
};

describe('Date field', () => {
	it('Should format initial value correctly', () => {
		const initialValue = new Date();

		const [{ result }] = renderUseDateField({ initialValue });

		expect(result.current.text).toBe(formatDate(initialValue, false));
		expect(result.current.value?.getTime()).toBe(initialValue.getTime());
	});

	it('Should set default conversion error correctly', async () => {
		const [{ result }] = renderUseDateField();

		await act(() => {
			result.current.onTextChange('2000-20-20');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultDateFieldI18n.invalidInput);
		});

		await act(() => {
			result.current.onTextChange('aaaa');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultDateFieldI18n.invalidInput);
		});

		await act(() => {
			result.current.onTextChange('1000');
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultDateFieldI18n.invalidInput);
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

	it('Should set default error if field is required and empty', async () => {
		const [{ result }] = renderUseDateField({ required: true });

		act(() => {
			result.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultDateFieldI18n.required);
		});
	});

	it('Should set default error if date is earlier than minDate', async () => {
		const minDate = new Date(2000, 0, 5);
		const [{ result }] = renderUseDateField({ minDate });

		await act(() => {
			result.current.control.setValue(new Date(2000, 0, 4));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultDateFieldI18n.minDate(minDate, false));
		});

		await act(() => {
			result.current.control.setValue(new Date(2000, 0, 6));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set default error if date is later than maxDate', async () => {
		const maxDate = new Date(2000, 0, 5);
		const [{ result }] = renderUseDateField({ maxDate });

		act(() => {
			result.current.control.setValue(new Date(2000, 0, 6));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe(defaultDateFieldI18n.maxDate(maxDate, false));
		});

		await act(() => {
			result.current.control.setValue(new Date(2000, 0, 4));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBeUndefined();
		});
	});

	it('Should set custom conversion error correctly', async () => {
		const [{ result }] = renderUseDateField({
			i18n: {
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

	it('Should set custom error if field is required and empty', async () => {
		const [{ result }] = renderUseDateField({
			required: true,
			i18n: {
				required: 'custom',
			},
		});

		act(() => {
			result.current.control.setValue(null);
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set custom error if date is earlier than min date', async () => {
		const [{ result }] = renderUseDateField({
			minDate: new Date(42),
			i18n: {
				minDate: () => 'custom',
			},
		});

		act(() => {
			result.current.control.setValue(new Date(41));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should set custom error if date is later than max date', async () => {
		const [{ result }] = renderUseDateField({
			maxDate: new Date(42),
			i18n: {
				maxDate: () => 'custom',
			},
		});

		act(() => {
			result.current.control.setValue(new Date(43));
		});

		await waitFor(() => {
			expect(result.current.meta.error?.$error).toBe('custom');
		});
	});

	it('Should be able to format date differently', () => {
		const formatDate = jest.fn(() => 'custom');
		const initialValue = new Date();
		const [{ result }] = renderUseDateField({ formatDate, initialValue });

		expect(result.current.text).toBe('custom');
		expect(formatDate).toBeCalledWith(initialValue, false);
	});

	it('Should call custom parseDate function', async () => {
		const parseDate = jest.fn();

		const [{ result }] = renderUseDateField({ parseDate });

		await act(() => {
			result.current.onTextChange('2023-09-12');
		});

		await waitFor(() => {
			expect(parseDate).toBeCalledWith('2023-09-12', false);
		});
	});

	it('Should format date with time', () => {
		const [{ result }] = renderUseDateField({ pickTime: true, initialValue: new Date(2023, 8, 12, 17, 29) });

		expect(result.current.text).toBe('2023.09.12 17:29');
	});

	it('Should parse date with time', async () => {
		const [{ result }] = renderUseDateField({ pickTime: true });

		await act(() => {
			result.current.onTextChange('2023-09-12 17:31');
		});

		await waitFor(() => {
			expect(result.current.value?.getTime()).toBe(new Date(2023, 8, 12, 17, 31).getTime());
		});
	});
});
