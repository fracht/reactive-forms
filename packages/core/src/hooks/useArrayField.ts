import { Pxth } from 'pxth';

import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/FieldTouched';
import { ArrayControl, useArrayControl } from './useArrayControl';
import { FieldConfig, useField } from './useField';

export type ArrayFieldConfig<V> = FieldConfig<Array<V>>;

export type ArrayFieldProps<V> = {
	items: Array<V>;
	name: Pxth<Array<V>>;
	errors?: FieldError<Array<V>>;
	touched?: FieldTouched<Array<V>>;
} & ArrayControl<V>;

export const useArrayField = <V>({ ...fieldContextConfig }: ArrayFieldConfig<V>): ArrayFieldProps<V> => {
	const {
		value: items,
		meta: { error: errors, touched },
	} = useField<Array<V>>(fieldContextConfig);

	const { name } = fieldContextConfig;

	const control = useArrayControl<V>({ name });

	return {
		items,
		name,
		errors,
		touched,
		...control,
	};
};
