import { FieldConfig, FieldContext, useField, useFieldValidator } from '@reactive-forms/core';

export type BooleanFieldConfig = FieldConfig<boolean | null | undefined> & {
	required?: boolean;
	requiredError?: string;
};

export const defaultRequiredError = 'Field is required';

export type BooleanFieldBag = FieldContext<boolean | null | undefined> & {
	onBlur: () => void;
};

export const useBooleanField = ({ required, requiredError = defaultRequiredError, ...config }: BooleanFieldConfig) => {
	const fieldBag = useField(config);

	const {
		control: { setTouched },
	} = fieldBag;

	const onBlur = () => {
		setTouched({ $touched: true });
	};

	useFieldValidator({
		name: config.name,
		validator: (value) => {
			if (required && !value) {
				return requiredError;
			}

			return undefined;
		},
	});

	return {
		...fieldBag,
		onBlur,
	};
};
