import { NestedObject } from './NestedObject';

// Test
export type FieldInnerError = {
	$error?: string;
};

export type FieldError<V> = NestedObject<FieldInnerError, V>;
