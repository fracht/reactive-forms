import { NestedObject } from './NestedObject';

export type MorfixInnerError = {
    mrfxError?: string;
};

export type MorfixErrors<V> = NestedObject<MorfixInnerError, V>;
