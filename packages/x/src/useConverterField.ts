import { useEffect, useRef, useState } from 'react';
import { FieldConfig, FieldContext, FieldError, FieldTouched, useField, useFieldValidator } from '@reactive-forms/core';
import isObject from 'lodash/isObject';

export class ConversionError extends Error {
	public constructor(errorMessage: string) {
		super(errorMessage);
	}
}

export type ConverterFieldConfig<T> = {
	parse: (value: string) => T;
	format: (value: T) => string;

	// An option that allow to ignore updates incoming from form level state while field is focused
	ignoreFormStateUpdatesWhileFocus?: boolean;
} & FieldConfig<T>;

export type ConverterFieldBag<T> = {
	text: string;
	onTextChange: (text: string) => void;
	onFocus: () => void;
	onBlur: () => void;
} & FieldContext<T>;

export const useConverterField = <T>({
	parse,
	format,
	ignoreFormStateUpdatesWhileFocus,
	...fieldConfig
}: ConverterFieldConfig<T>): ConverterFieldBag<T> => {
	const fieldBag = useField(fieldConfig);

	const {
		value,
		control: { setValue, setError, setTouched },
	} = fieldBag;

	const [isFocused, setIsFocused] = useState(false);
	const [text, setText] = useState(() => format(value));
	const textRef = useRef(text);
	textRef.current = text;

	const [hasConversionError, setHasConversionError] = useState(false);

	const tryConvert = (text: string) => {
		try {
			const value = parse(text); // this could throw in case of conversion error
			setValue(value);
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
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	const onBlur = () => {
		setIsFocused(false);
		setTouched({ $touched: true } as FieldTouched<T>);
		tryConvert(text);
	};

	useFieldValidator({
		name: fieldConfig.name,
		validator: () => {
			try {
				parse(textRef.current);
			} catch (error) {
				if (isObject(error) && error instanceof ConversionError) {
					return error.message;
				}

				throw error;
			}

			return undefined;
		},
	});

	useEffect(() => {
		if ((isFocused && ignoreFormStateUpdatesWhileFocus) || hasConversionError) {
			return;
		}

		const formattedValue = format(value);
		textRef.current = formattedValue;
		setText(formattedValue);
	}, [value, format, hasConversionError, isFocused, ignoreFormStateUpdatesWhileFocus]);

	return {
		text,
		onTextChange,
		onFocus,
		onBlur,
		...fieldBag,
	};
};
