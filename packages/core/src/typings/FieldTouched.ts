import { NestedObject } from './NestedObject';

export type FieldInnerTouched = {
	$touched?: boolean;
};

export type FieldTouched<V> = NestedObject<FieldInnerTouched, V>;
