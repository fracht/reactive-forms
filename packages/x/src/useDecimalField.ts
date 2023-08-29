import { useCallback } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';

import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

const DECIMAL_REGEX = /^\d*\.?\d*$/;
export const defaultPrecision = 2;

export const defaultFormat = (value: number | null | undefined, precision: number) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toFixed(precision).toString();
};

export type DecimalFieldErrorMessages = {
	invalidInput: string;
	required: string;
	lessThanMinValue: (min: number, precision: number) => string;
	moreThanMaxValue: (max: number, precision: number) => string;
};

export const defaultErrorMessages: DecimalFieldErrorMessages = {
	invalidInput: 'Must be decimal',
	required: 'Field is required',
	lessThanMinValue: (min, precision) => `Value should not be less than ${defaultFormat(min, precision)}`,
	moreThanMaxValue: (max, precision) => `Value should not be more than ${defaultFormat(max, precision)}`,
};

export type DecimalFieldConfig = FieldConfig<number | null | undefined> & {
	required?: boolean;
	min?: number;
	max?: number;

	format?: (value: number | null | undefined, precision: number) => string;
	parse?: (text: string) => number;
	errorMessages?: Partial<DecimalFieldErrorMessages>;

	precision?: number;
};

export type DecimalFieldBag = ConverterFieldBag<number | null | undefined>;

export const useDecimalField = ({
	name,
	validator,
	schema,
	required,
	min,
	max,
	format,
	parse,
	errorMessages = defaultErrorMessages,
	precision = defaultPrecision,
}: DecimalFieldConfig): DecimalFieldBag => {
	const defaultParse = useCallback(
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

	const formatValue = useCallback(
		(value: number | null | undefined) => {
			return (format ?? defaultFormat)(value, precision);
		},
		[format, precision],
	);

	const decimalBag = useConverterField({
		parse: parse ?? defaultParse,
		format: formatValue,
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
				return (errorMessages.lessThanMinValue ?? defaultErrorMessages.lessThanMinValue)(min, precision);
			}

			if (typeof max === 'number' && value > max) {
				return (errorMessages.moreThanMaxValue ?? defaultErrorMessages.moreThanMaxValue)(max, precision);
			}

			return undefined;
		},
	});

	return decimalBag;
};
