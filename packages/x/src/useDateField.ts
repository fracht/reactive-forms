import { useCallback } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

dayjs.extend(customParseFormat);

const defaultDateFormats = ['DD.MM.YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD', 'DD-MM-YYYY', 'DD/MM/YYYY'];
const defaultDateTimeFormats = [
	'DD.MM.YYYY HH:mm',
	'YYYY-MM-DD HH:mm',
	'YYYY/MM/DD HH:mm',
	'YYYY.MM.DD HH:mm',
	'DD-MM-YYYY HH:mm',
	'DD/MM/YYYY HH:mm',
];

export const defaultLocales: Intl.LocalesArgument = 'EN';

export const defaultFormatOptions: Intl.DateTimeFormatOptions = {};

const formatDate = (
	value: Date | null | undefined,
	locales?: Intl.LocalesArgument,
	options?: Intl.DateTimeFormatOptions,
) => {
	if (!(value instanceof Date)) {
		return '';
	}

	return value.toLocaleString(locales, options);
};

export type DateFieldErrorMessages = {
	invalidInput: string;
	required: string;
	earlierThanMinDate: (min: Date, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) => string;
	laterThanMaxDate: (max: Date, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) => string;
};

export const defaultErrorMessages: DateFieldErrorMessages = {
	invalidInput: 'Must be date',
	required: 'Field is required',
	earlierThanMinDate: (min, locales, options) => `Date must not be earlier than ${formatDate(min, locales, options)}`,
	laterThanMaxDate: (max, locales, options) => `Date must not be later than ${formatDate(max, locales, options)}`,
};

export type DateFieldConfig = FieldConfig<Date | null | undefined> & {
	required?: boolean;
	minDate?: Date;
	maxDate?: Date;
	pickTime?: boolean;

	formatDate?: (date: Date | null | undefined) => string;
	parseDate?: (text: string) => Date;
	errorMessages?: Partial<DateFieldErrorMessages>;

	locales?: Intl.LocalesArgument;
	formatOptions?: Intl.DateTimeFormatOptions;
};

export type DateFieldBag = ConverterFieldBag<Date | null | undefined>;

export const useDateField = ({
	name,
	validator,
	schema,
	required,
	minDate,
	maxDate,
	pickTime,
	formatDate: formatDateProps,
	parseDate: parseDateProps,
	errorMessages = defaultErrorMessages,
	locales = defaultLocales,
	formatOptions = defaultFormatOptions,
}: DateFieldConfig): DateFieldBag => {
	const parseDate = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			const errorMessage = errorMessages.invalidInput ?? defaultErrorMessages.invalidInput;

			const date = dayjs(text, [...defaultDateFormats, ...(pickTime ? defaultDateTimeFormats : [])], true);

			if (!date.isValid()) {
				throw new ConversionError(errorMessage);
			}

			return date.toDate();
		},
		[errorMessages.invalidInput, pickTime],
	);

	const format = useCallback(
		(value: Date | null | undefined) => {
			if (formatDateProps) {
				return formatDateProps(value);
			}

			return formatDate(value, locales, formatOptions);
		},
		[formatDateProps, formatOptions, locales],
	);

	const dateBag = useConverterField({
		parse: parseDateProps ?? parseDate,
		format,
		name,
		validator,
		schema,
	});

	useFieldValidator({
		name,
		validator: (value) => {
			if (required && !(value instanceof Date)) {
				return errorMessages.required ?? defaultErrorMessages.required;
			}

			if (!(value instanceof Date)) {
				return undefined;
			}

			if (minDate instanceof Date && dayjs(minDate).diff(dayjs(value)) > 0) {
				return (errorMessages.earlierThanMinDate ?? defaultErrorMessages.earlierThanMinDate)(minDate);
			}

			if (maxDate instanceof Date && dayjs(value).diff(dayjs(maxDate)) > 0) {
				return (errorMessages.laterThanMaxDate ?? defaultErrorMessages.laterThanMaxDate)(maxDate);
			}

			return undefined;
		},
	});

	return dateBag;
};
