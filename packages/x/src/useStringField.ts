import { FieldConfig, FieldContext, useField, useFieldValidator } from '@reactive-forms/core';
import isFunction from 'lodash/isFunction';

export const defaultRequiredError = 'Field is required';
export const defaultMinLengthError = (minLength: number) =>
	`String should not include less than ${minLength} character(s)`;
export const defaultMaxLengthError = (maxLength: number) =>
	`String should not include more than ${maxLength} character(s)`;

export type ErrorTuple<T> = [value: T, message: string | ((value: T) => string)];

export type StringFieldConfig = FieldConfig<string | undefined | null> & {
	formatter?: (value: string) => string;

	required?: boolean | string;
	minLength?: number | ErrorTuple<number>;
	maxLength?: number | ErrorTuple<number>;
};

export type StringFieldBag = FieldContext<string | undefined | null> & {
	onBlur: () => void;
};

export const useStringField = ({
	name,
	validator,
	schema,
	formatter = (val) => val,
	required,
	maxLength,
	minLength,
}: StringFieldConfig) => {
	const fieldBag = useField({ name, validator, schema });

	const {
		control: { setTouched, setValue },
		value,
	} = fieldBag;

	useFieldValidator({
		name,
		validator: (value: string | undefined | null) => {
			const isValueEmpty = !value || value.trim().length === 0;

			if (required && isValueEmpty) {
				return required === true ? defaultRequiredError : required;
			}

			const valueLength = value?.length ?? 0;

			if (minLength) {
				if (Array.isArray(minLength)) {
					const [length, message] = minLength;

					if (valueLength < length) {
						return isFunction(message) ? message(length) : message;
					}
				} else if (valueLength < minLength) {
					return defaultMinLengthError(minLength);
				}
			}

			if (maxLength) {
				if (Array.isArray(maxLength)) {
					const [length, message] = maxLength;

					if (valueLength > length) {
						return isFunction(message) ? message(length) : message;
					}
				} else if (valueLength > maxLength) {
					return defaultMaxLengthError(maxLength);
				}
			}

			return undefined;
		},
	});

	const onBlur = () => {
		setTouched({ $touched: true });
		setValue(formatter(value ?? ''));
	};

	return {
		onBlur,
		...fieldBag,
	};
};
