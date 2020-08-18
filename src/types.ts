export type MorfixContextType<Values extends MorfixValues> = {
    values: Values;
    initialValues: Values;
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
    initialValue: T;
}

export type FieldContext<T> = [FieldMeta<T>, FieldHandlers<T>];

export interface SharedFieldConfig {
    name: string;
}

export interface FieldProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<{ value: string }>) => void;
    onBlur?: (e: React.FocusEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
}
