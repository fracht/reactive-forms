import { NestedObject } from './NestedObject';

export type MorfixInnerTouched = {
    mrfxTouched?: boolean;
};

export type MorfixTouched<V> = NestedObject<MorfixInnerTouched, V>;
