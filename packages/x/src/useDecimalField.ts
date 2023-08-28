import { useCallback } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';

import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

const DECIMAL_REGEX = /^\d*\.?\d*$/;

export const defaultLocales: Intl.LocalesArgument = 'EN';

export const defaultFormatOptions: Intl.NumberFormatOptions = {
	minimumFractionDigits: 1,
	maximumFractionDigits: 2,
};

const formatDecimal = (
	value: number | null | undefined,
	locales?: Intl.LocalesArgument,
	options?: Intl.NumberFormatOptions,
) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toLocaleString(locales, options);
};

export type DecimalFieldErrorMessages = {
	invalidInput: string;
	required: string;
	lessThanMinValue: (min: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) => string;
	moreThanMaxValue: (max: number, locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) => string;
};

export const defaultErrorMessages: DecimalFieldErrorMessages = {
	invalidInput: 'Must be decimal',
	required: 'Field is required',
	lessThanMinValue: (min, locales, options) =>
		`Value should not be less than ${formatDecimal(min, locales, options)}`,
	moreThanMaxValue: (max, locales, options) =>
		`Value should not be more than ${formatDecimal(max, locales, options)}`,
};

export type DecimalFieldConfig = FieldConfig<number | null | undefined> & {
	required?: boolean;
	min?: number;
	max?: number;

	formatValue?: (value: number | null | undefined) => string;
	parseDecimal?: (text: string) => number;
	errorMessages?: Partial<DecimalFieldErrorMessages>;

	locales?: Intl.LocalesArgument;
	formatOptions?: Intl.NumberFormatOptions;
};

export type DecimalFieldBag = ConverterFieldBag<number | null | undefined>;

export const useDecimalField = ({
	name,
	validator,
	schema,
	required,
	min,
	max,
	formatValue,
	parseDecimal: parseDecimalProps,
	errorMessages = defaultErrorMessages,
	locales = defaultLocales,
	formatOptions = defaultFormatOptions,
}: DecimalFieldConfig): DecimalFieldBag => {
	const parseDecimal = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			const errorMessage = errorMessages.invalidInput ?? defaultErrorMessages.invalidInput;

			if (!DECIMAL_REGEX.test(text)) {
				throw new ConversionError(errorMessage);
			}

			const value = Number.parseFloat(text);

			if (Number.isNaN(value)) {
				// "." is valid decimal number zero, however Number.parseFloat returns NaN
				if (text === '.') {
					return 0;
				}

				throw new ConversionError(errorMessage);
			}

			return value;
		},
		[errorMessages.invalidInput],
	);

	const format = useCallback(
		(value: number | null | undefined) => {
			if (formatValue) {
				return formatValue(value);
			}

			return formatDecimal(value, locales, formatOptions);
		},
		[formatOptions, formatValue, locales],
	);

	const decimalBag = useConverterField({
		parse: parseDecimalProps ?? parseDecimal,
		format,
		name,
		validator,
		schema,
	});

	useFieldValidator({
		name,
		validator: (value) => {
			if (required && typeof value !== 'number') {
				return errorMessages.required ?? defaultErrorMessages.required;
			}

			if (typeof value !== 'number') {
				return undefined;
			}

			if (typeof min === 'number' && value < min) {
				return (errorMessages.lessThanMinValue ?? defaultErrorMessages.lessThanMinValue)(min);
			}

			if (typeof max === 'number' && value > max) {
				return (errorMessages.moreThanMaxValue ?? defaultErrorMessages.moreThanMaxValue)(max);
			}

			return undefined;
		},
	});

	return decimalBag;
};
