import { useCallback } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';

import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

const INTEGER_REGEX = /^-?\d+$/;

const formatInteger = (value: number | null | undefined) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toFixed(0);
};

export type IntegerFieldErrorMessages = {
	invalidInput: string;
	required: string;
	lessThanMinValue: ((min: number) => string) | string;
	moreThanMaxValue: ((max: number) => string) | string;
};

export const defaultErrorMessages: IntegerFieldErrorMessages = {
	invalidInput: 'Must be integer',
	required: 'Field is required',
	lessThanMinValue: (min) => `Value should not be less than ${min.toFixed(0)}`,
	moreThanMaxValue: (max) => `Value should not be more than ${max.toFixed(0)}`,
};

export type IntegerFieldConfig = FieldConfig<number | null | undefined> & {
	required?: boolean;
	min?: number;
	max?: number;

	formatValue?: (value: number | null | undefined) => string;
	errorMessages?: IntegerFieldErrorMessages;
};

export type IntegerFieldBag = ConverterFieldBag<number | null | undefined> & {};

export const useIntegerField = ({
	name,
	validator,
	schema,
	required,
	min,
	max,
	formatValue,
	errorMessages = defaultErrorMessages,
}: IntegerFieldConfig): IntegerFieldBag => {
	const { invalidInput, required: requiredError, lessThanMinValue, moreThanMaxValue } = errorMessages;

	const parseInteger = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			if (!INTEGER_REGEX.test(text)) {
				throw new ConversionError(invalidInput);
			}

			const value = Number.parseInt(text);

			if (Number.isNaN(value)) {
				throw new ConversionError(invalidInput);
			}

			return value;
		},
		[invalidInput],
	);

	const integerBag = useConverterField({
		parse: parseInteger,
		format: formatValue ?? formatInteger,
		name,
		validator,
		schema,
	});

	useFieldValidator({
		name,
		validator: (value) => {
			if (required && typeof value !== 'number') {
				return requiredError;
			}

			if (typeof value !== 'number') {
				return undefined;
			}

			if (typeof min === 'number' && value < Math.round(min)) {
				return typeof lessThanMinValue === 'function' ? lessThanMinValue(min) : lessThanMinValue;
			}

			if (typeof max === 'number' && value > Math.round(max)) {
				return typeof moreThanMaxValue === 'function' ? moreThanMaxValue(max) : moreThanMaxValue;
			}

			return undefined;
		},
	});

	return integerBag;
};
