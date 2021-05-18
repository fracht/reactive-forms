import { FieldError } from './FieldError';

export type Empty = null | undefined | void;

export type FieldValidator<V> = (value: V) => FieldError<V> | Empty | Promise<FieldError<V> | Empty>;
