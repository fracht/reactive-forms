import { FieldError } from './FieldError';
import { FieldMeta } from './FieldMeta';
import { FieldTouched } from './FieldTouched';

export type FieldContext<V> = {
	value: V;
	meta: FieldMeta<V>;
	control: {
		setValue: (value: V) => void;
		setTouched: (touched: FieldTouched<V> | undefined) => void;
		setError: (error: FieldError<V> | undefined) => void;
	};
};
