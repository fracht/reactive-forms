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
	lessThanMinValue: (min: number) => string;
	moreThanMaxValue: (max: number) => string;
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
	errorMessages?: Partial<IntegerFieldErrorMessages>;
};

export type IntegerFieldBag = ConverterFieldBag<number | null | undefined> & {};

export const useIntegerField = ({
	name,
	validator,
	schema,
	required,
	min,
	max,
	formatValue = formatInteger,
	errorMessages = defaultErrorMessages,
}: IntegerFieldConfig): IntegerFieldBag => {
	const parseInteger = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			const errorMessage = errorMessages.invalidInput ?? defaultErrorMessages.invalidInput;

			if (!INTEGER_REGEX.test(text)) {
				throw new ConversionError(errorMessage);
			}

			const value = Number.parseInt(text);

			if (Number.isNaN(value)) {
				throw new ConversionError(errorMessage);
			}

			return value;
		},
		[errorMessages.invalidInput],
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
				return errorMessages.required ?? defaultErrorMessages.required;
			}

			if (typeof value !== 'number') {
				return undefined;
			}

			if (typeof min === 'number' && value < Math.round(min)) {
				return (errorMessages.lessThanMinValue ?? defaultErrorMessages.lessThanMinValue)(min);
			}

			if (typeof max === 'number' && value > Math.round(max)) {
				return (errorMessages.moreThanMaxValue ?? defaultErrorMessages.moreThanMaxValue)(max);
			}

			return undefined;
		},
	});

	return integerBag;
};
