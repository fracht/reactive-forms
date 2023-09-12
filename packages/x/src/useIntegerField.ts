import { useCallback, useContext } from 'react';
import { FieldConfig, useFieldValidator } from '@reactive-forms/core';

import { IntegerFieldI18nContext } from './IntegerFieldI18n';
import { ConversionError, ConverterFieldBag, useConverterField } from './useConverterField';

const INTEGER_REGEX = /^-?\d+$/;

const formatInteger = (value: number | null | undefined) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toFixed(0);
};

export type IntegerFieldConfig = FieldConfig<number | null | undefined> & {
	required?: boolean;
	min?: number;
	max?: number;

	formatValue?: (value: number | null | undefined) => string;
};

export type IntegerFieldBag = ConverterFieldBag<number | null | undefined>;

export const useIntegerField = ({
	name,
	validator,
	schema,
	required,
	min,
	max,
	formatValue = formatInteger,
}: IntegerFieldConfig): IntegerFieldBag => {
	const i18n = useContext(IntegerFieldI18nContext);

	const parseInteger = useCallback(
		(text: string) => {
			text = text.trim();

			if (text.length === 0) {
				return null;
			}

			if (!INTEGER_REGEX.test(text)) {
				throw new ConversionError(i18n.invalidInput);
			}

			const value = Number.parseInt(text);

			if (Number.isNaN(value)) {
				throw new ConversionError(i18n.invalidInput);
			}

			return value;
		},
		[i18n.invalidInput],
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
				return i18n.required;
			}

			if (typeof value !== 'number') {
				return undefined;
			}

			if (typeof min === 'number' && value < min) {
				return i18n.minValue(min);
			}

			if (typeof max === 'number' && value > max) {
				return i18n.maxValue(max);
			}

			return undefined;
		},
	});

	return integerBag;
};
