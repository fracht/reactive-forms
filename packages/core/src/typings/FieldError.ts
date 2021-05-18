import { NestedObject } from './NestedObject';

export type FieldInnerError = {
    mrfxError?: string;
};

export type FieldError<V> = NestedObject<FieldInnerError, V>;
