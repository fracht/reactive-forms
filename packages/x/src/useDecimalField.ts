import { useCallback } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';
import { isFunction, isNil } from 'lodash';

import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

const DECIMAL_REGEX = /^\d*\.?\d*$/;
export const defaultPrecision = 2;

export const defaultFormat = (value: number | null | undefined, precision: number) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toFixed(precision).toString();
};

export const defaultRequiredError = 'Field is required';
export const defaultInvalidInputError = 'Must be decimal';
export const defaultMinValueError = (min: number, precision: number) =>
	`Value should not be less than ${defaultFormat(min, precision)}`;
export const defaultMaxValueError = (max: number, precision: number) =>
	`Value should not be more than ${defaultFormat(max, precision)}`;

export type ErrorTuple<T> = [value: T, message: string | ((value: T) => string)];

export type DecimalFieldConfig = FieldConfig<number | null | undefined> & {
	required?: boolean | string;
	invalidInput?: string;
	min?: number | ErrorTuple<number>;
	max?: number | ErrorTuple<number>;

	format?: (value: number | null | undefined, precision: number) => string;
	parse?: (text: string) => number;

	precision?: number;
};

export type DecimalFieldBag = ConverterFieldBag<number | null | undefined>;

export const useDecimalField = ({
	name,
	validator,
	schema,
	required,
	invalidInput,
	min,
	max,
	format,
	parse,
	precision = defaultPrecision,
}: DecimalFieldConfig): DecimalFieldBag => {
	const defaultParse = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			const parseError = invalidInput ?? defaultInvalidInputError;

			if (!DECIMAL_REGEX.test(text)) {
				throw new ConversionError(parseError);
			}

			const value = Number.parseFloat(text);

			if (Number.isNaN(value)) {
				// "." is valid decimal number zero, however Number.parseFloat returns NaN
				if (text === '.') {
					return 0;
				}

				throw new ConversionError(parseError);
			}

			return value;
		},
		[invalidInput],
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
				return required === true ? defaultRequiredError : required;
			}

			if (typeof value !== 'number') {
				return undefined;
			}

			if (!isNil(min)) {
				if (Array.isArray(min)) {
					const [minValue, message] = min;

					if (value < minValue) {
						return isFunction(message) ? message(value) : message;
					}
				} else if (value < min) {
					return defaultMinValueError(min, precision);
				}
			}

			if (!isNil(max)) {
				if (Array.isArray(max)) {
					const [maxValue, message] = max;

					if (value > maxValue) {
						return isFunction(message) ? message(value) : message;
					}
				} else if (value > max) {
					return defaultMaxValueError(max, precision);
				}
			}

			return undefined;
		},
	});

	return decimalBag;
};
