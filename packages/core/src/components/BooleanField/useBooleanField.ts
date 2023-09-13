import { useContext } from 'react';

import { BooleanFieldI18nContext } from './BooleanFieldI18n';
import { useFieldValidator } from '../../helpers/useFieldValidator';
import { FieldContext } from '../../typings/FieldContext';
import { FieldConfig, useField } from '../Field/useField';

export type BooleanFieldConfig = FieldConfig<boolean | null | undefined> & {
	required?: boolean;
};

export type BooleanFieldBag = FieldContext<boolean | null | undefined> & {
	onBlur: () => void;
};

export const useBooleanField = ({ required, ...config }: BooleanFieldConfig) => {
	const fieldBag = useField(config);

	const {
		control: { setTouched },
	} = fieldBag;

	const i18n = useContext(BooleanFieldI18nContext);

	const onBlur = () => {
		setTouched({ $touched: true });
	};

	useFieldValidator({
		name: config.name,
		validator: (value) => {
			if (required && !value) {
				return i18n.required;
			}

			return undefined;
		},
	});

	return {
		...fieldBag,
		onBlur,
	};
};
