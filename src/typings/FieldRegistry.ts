import { FieldValidator } from './FieldValidator';
import { MorfixErrors } from './MorfixErrors';
import { FunctionArray, Observable } from '../utils/FunctionArray';

export type FieldMeta<V> = {
    value: Observable<V>;
    error: Observable<MorfixErrors<V> | undefined>;
    validator: FunctionArray<FieldValidator<V>>;
};

export type FieldRegistry = Record<string, FieldMeta<unknown>>;
