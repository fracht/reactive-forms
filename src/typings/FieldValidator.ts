import { MorfixErrors } from './MorfixErrors';

export type Empty = null | undefined | void;

export type FieldValidator<V> = (value: V) => MorfixErrors<V> | Empty | Promise<MorfixErrors<V> | Empty>;
