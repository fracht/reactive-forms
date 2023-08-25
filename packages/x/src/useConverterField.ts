import { useState } from 'react';
import { FieldConfig, FieldContext, FieldError, useField } from '@reactive-forms/core';
import isObject from 'lodash/isObject';

export class ConversionError extends Error {
	public constructor(errorMessage: string) {
		super(errorMessage);
	}
}

export type ConverterFieldConfig<T> = {
	parse: (value: string) => T; // can throw
	format: (value: T) => string; // cannot throw

	onChangeText?: (text: string) => void;
} & FieldConfig<T>;

export type ConverterFieldBag<T> = {
	text: string;
	onTextChange: (text: string) => void;
} & FieldContext<T>;

export const useConverterField = <T>({
	parse,
	format,
	onChangeText,
	...fieldConfig
}: ConverterFieldConfig<T>): ConverterFieldBag<T> => {
	const fieldBag = useField(fieldConfig);

	const {
		value,
		control: { setValue, setError },
	} = fieldBag;

	const [text, setText] = useState(() => format(value));

	const tryConvert = (text: string) => {
		try {
			setValue(parse(text));
			// setHasConversionError(false);
		} catch (error) {
			if (isObject(error) && error instanceof ConversionError) {
				// setHasConversionError(true);
				setError({
					$error: error.message,
				} as FieldError<T>);
			} else {
				throw error;
			}
		}
	};

	const onTextChange = (newText: string) => {
		setText(newText);
		tryConvert(newText);
		onChangeText?.(newText);
	};

	return {
		text,
		onTextChange,
		...fieldBag,
	};
};
