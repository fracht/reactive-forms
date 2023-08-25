import { useEffect, useRef, useState } from 'react';
import { FieldConfig, FieldContext, FieldError, useField } from '@reactive-forms/core';
import isObject from 'lodash/isObject';

export class ConversionError extends Error {
	public constructor(errorMessage: string) {
		super(errorMessage);
	}
}

export type ConverterFieldConfig<T> = {
	parse: (value: string) => T;
	format: (value: T) => string;

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
	const textRef = useRef(text);
	textRef.current = text;

	const [hasConversionError, setHasConversionError] = useState(false);

	const tryConvert = (text: string) => {
		try {
			setValue(parse(text));
			setHasConversionError(false);
		} catch (error) {
			if (isObject(error) && error instanceof ConversionError) {
				setHasConversionError(true);
				setError({
					$error: error.message,
				} as FieldError<T>);
			} else {
				throw error;
			}
		}
	};

	const onTextChange = (newText: string) => {
		textRef.current = newText;
		setText(newText);
		tryConvert(newText);
		onChangeText?.(newText);
	};

	useEffect(() => {
		if (hasConversionError) {
			return;
		}

		const formattedValue = format(value);
		textRef.current = formattedValue;
		setText(formattedValue);
	}, [value, format, hasConversionError]);

	return {
		text,
		onTextChange,
		...fieldBag,
	};
};
