import { FieldConfig, FieldContext, useField, useFieldValidator } from '@reactive-forms/core';

export type StringFieldErrorMessages = {
	required: string;
	shorterThanMinLength: ((minLength: number) => string) | string;
	longerThanMaxLength: ((maxLength: number) => string) | string;
};

export const defaultErrorMessages: StringFieldErrorMessages = {
	required: 'Field is required',
	shorterThanMinLength: (minLength: number) => `String should not include less than ${minLength} character(s)`,
	longerThanMaxLength: (maxLength: number) => `String should not include more than ${maxLength} character(s)`,
};

export type StringFieldConfig = FieldConfig<string | undefined | null> & {
	required?: boolean;
	minLength?: number;
	maxLength?: number;

	formatter?: (value: string) => string;

	errorMessages?: StringFieldErrorMessages;
};

export type StringFieldBag = FieldContext<string | undefined | null> & {
	onBlur: () => void;
};

export const useStringField = ({
	name,
	validator,
	schema,
	required,
	minLength,
	maxLength,
	formatter = (val) => val,
	errorMessages = defaultErrorMessages,
}: StringFieldConfig) => {
	const { required: requiredError, shorterThanMinLength, longerThanMaxLength } = errorMessages;

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
				return requiredError;
			}

			if (typeof minLength === 'number' && ((isValueEmpty && minLength > 0) || value!.length < minLength)) {
				return typeof shorterThanMinLength === 'function'
					? shorterThanMinLength(minLength)
					: shorterThanMinLength;
			}

			if (typeof maxLength === 'number' && value && value.length > maxLength) {
				return typeof longerThanMaxLength === 'function' ? longerThanMaxLength(maxLength) : longerThanMaxLength;
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
