import { NestedObject } from './NestedObject';

export type FieldInnerTouched = {
    mrfxTouched?: boolean;
};

export type FieldTouched<V> = NestedObject<FieldInnerTouched, V>;
