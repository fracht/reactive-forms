import { NestedObject } from './NestedObject';

export type FieldInnerError = {
	$error?: string;
};

export type FieldError<V> = NestedObject<FieldInnerError, V>;
