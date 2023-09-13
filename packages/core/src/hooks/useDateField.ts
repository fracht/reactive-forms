import { useCallback, useContext } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { DateFieldI18nContext } from './DateFieldI18n';
import { ConversionError, ConverterFieldBag, useConverterField, ValueConverter } from './useConverterField';
import { FieldConfig } from './useField';
import { useFieldValidator } from './useFieldValidator';
import { formatDate } from '../utils/formatDate';

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

export type DateFieldConfig = FieldConfig<Date | null | undefined> & {
	required?: boolean;
	minDate?: Date;
	maxDate?: Date;
	pickTime?: boolean;
} & Partial<ValueConverter<Date | null | undefined>>;

export type DateFieldBag = ConverterFieldBag<Date | null | undefined>;

export const useDateField = ({
	name,
	validator,
	schema,
	required,
	minDate,
	maxDate,
	pickTime = false,
	format: customFormatDate,
	parse: customParseDate,
}: DateFieldConfig): DateFieldBag => {
	const i18n = useContext(DateFieldI18nContext);

	const parse = useCallback(
		(text: string) => {
			text = text.trim();

			if (customParseDate) {
				return customParseDate(text);
			}

			if (text.length === 0) {
				return null;
			}

			const date = dayjs(text, [...defaultDateFormats, ...(pickTime ? defaultDateTimeFormats : [])], true);

			if (!date.isValid()) {
				throw new ConversionError(i18n.invalidInput);
			}

			return date.toDate();
		},
		[customParseDate, i18n.invalidInput, pickTime],
	);

	const format = useCallback(
		(value: Date | null | undefined) => {
			if (customFormatDate) {
				return customFormatDate(value);
			}

			return formatDate(value, pickTime);
		},
		[customFormatDate, pickTime],
	);

	const dateBag = useConverterField({
		parse,
		format,
		name,
		validator,
		schema,
	});

	useFieldValidator({
		name,
		validator: (value) => {
			if (required && !(value instanceof Date)) {
				return i18n.required;
			}

			if (!(value instanceof Date)) {
				return undefined;
			}

			if (minDate instanceof Date && dayjs(minDate).diff(dayjs(value)) > 0) {
				return i18n.minDate(minDate, pickTime);
			}

			if (maxDate instanceof Date && dayjs(value).diff(dayjs(maxDate)) > 0) {
				return i18n.maxDate(maxDate, pickTime);
			}

			return undefined;
		},
	});

	return dateBag;
};
