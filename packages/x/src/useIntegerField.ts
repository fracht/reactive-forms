import { useCallback } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';

import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

export const defaultRequiredError = 'Field is required';
export const defaultInvalidInputError = 'Must be integer';
export const defaultMinValueError = (min: number) => `Value should not be less than ${min.toFixed(0)}`;
export const defaultMaxValueError = (max: number) => `Value should not be more than ${max.toFixed(0)}`;

const INTEGER_REGEX = /^-?\d+$/;

const formatInteger = (value: number | null | undefined) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toFixed(0);
};

export type ErrorTuple<T> = [value: T, message: string | ((value: T) => string)];

export type IntegerFieldConfig = FieldConfig<number | null | undefined> & {
	required?: boolean | string;
	invalidInput?: string;
	min?: number | ErrorTuple<number>;
	max?: number | ErrorTuple<number>;

	formatValue?: (value: number | null | undefined) => string;
};

export type IntegerFieldBag = ConverterFieldBag<number | null | undefined> & {};

export const useIntegerField = ({
	name,
	validator,
	schema,
	required,
	invalidInput,
	min,
	max,
	formatValue = formatInteger,
}: IntegerFieldConfig): IntegerFieldBag => {
	const parseInteger = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			const parseError = invalidInput ?? defaultInvalidInputError;

			if (!INTEGER_REGEX.test(text)) {
				throw new ConversionError(parseError);
			}

			const value = Number.parseInt(text);

			if (Number.isNaN(value)) {
				throw new ConversionError(parseError);
			}

			return value;
		},
		[invalidInput],
	);

	const integerBag = useConverterField({
		parse: parseInteger,
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
					return defaultMinValueError(min);
				}
			}

			if (!isNil(max)) {
				if (Array.isArray(max)) {
					const [maxValue, message] = max;

					if (value > maxValue) {
						return isFunction(message) ? message(value) : message;
					}
				} else if (value > max) {
					return defaultMaxValueError(max);
				}
			}

			return undefined;
		},
	});

	return integerBag;
};
