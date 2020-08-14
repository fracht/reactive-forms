export type MorfixContextType<Values extends MorfixValues> = {
    values: Values;
} & MorfixControl<Values>;

export type MorfixShared<Values extends MorfixValues> = MorfixContextType<
    Values
>;

export type MorfixValues = object;

export interface MorfixControl<Values extends MorfixValues> {
    setFieldValue: <T>(name: string, value: T) => void;
    setValues: (values: Values) => void;
}

export interface FieldHandlers<V> {
    setValue: (value: V) => void;
    setDeepValue: <T>(name: string, value: T) => void;
}

export interface FieldMeta<T> {
    value: T;
}

export type FieldContext<T> = [FieldMeta<T>, FieldHandlers<T>];
