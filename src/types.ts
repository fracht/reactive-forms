import { Schema } from 'yup';

export type MorfixContextType<Values extends MorfixValues> = {
    values: Values;
    errors: MorfixErrors<Values>;
    initialValues: Values;
} & MorfixControl<Values> &
    MorfixFormState;

export type MorfixShared<Values extends MorfixValues> = MorfixContextType<Values>;

export type MorfixValues = object;

export type SubmitAction<Values extends MorfixValues> = (
    values: Values,
    control: MorfixControl<Values>
) => Promise<void> | void;

export interface FieldError {
    message: string;
}

export interface MorfixFormState {
    readonly isSubmitting: boolean;
    readonly isValidating: boolean;
    readonly dirty: boolean;
}

export type MorfixInnerError = {
    error_mrfx?: FieldError;
};

type ArrayItemType<T> = T extends unknown[] ? T[number] : never;

export type MorfixErrors<Values> = Values extends object
    ? {
          [K in keyof Values]?: Values[K] extends object
              ? Values[K] extends unknown[]
                  ? MorfixErrors<ArrayItemType<Values[K]>>[] &
                        MorfixInnerError /** TODO: think about how to do not mutate array */
                  : MorfixErrors<Values[K]>
              : MorfixInnerError;
      } &
          MorfixInnerError
    : MorfixInnerError;

export interface MorfixControl<Values extends MorfixValues> {
    setFieldValue: <T>(name: string, value: T) => void;
    setValues: (values: Values) => void;
    registerFieldValidator: <T>(name: string, validator: FieldValidator<T>) => void;
    unregisterFieldValidator: (name: string) => void;
    submitForm: (submitAction?: SubmitAction<Values>) => Promise<void>;
    setSubmitting: (isSubmitting: boolean) => void;
}

export interface FieldHandlers<V> {
    setValue: (value: V) => void;
}

export interface FieldMeta<T> {
    value: T;
    initialValue: T;
    error: MorfixErrors<T>;
}

export type FieldContext<T> = [FieldMeta<T>, FieldHandlers<T>];

type NotRequired<T> = null | undefined | T;

type ValidatorReturnType<T> = MorfixErrors<T> | FieldError | string;

export type FieldValidator<T> = (
    value: T
) => Promise<NotRequired<ValidatorReturnType<T>>> | NotRequired<ValidatorReturnType<T>>;

export type ValidationRegistry = Record<string, FieldValidator<unknown>>;

export interface SharedFieldConfig<V> {
    name: string;
    validate?: FieldValidator<V>;
    validationSchema?: Schema<Partial<V> | undefined>;
}

export interface FieldProps {
    name: string;
    value: string;
    error?: FieldError;
    onChange: (e: React.ChangeEvent<{ value: string }>) => void;
    onBlur?: (e: React.FocusEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
}

type ChildrenCallback<Values extends MorfixValues> = (shared: MorfixShared<Values>) => React.ReactNode;

export type MorfixChildren<Values extends MorfixValues> =
    | ChildrenCallback<Values>
    | React.ReactNode
    | React.ReactNodeArray;

export type FunctionChangeListener<Values extends MorfixValues> = (
    initialValues: Values,
    currentValues: Values
) => boolean;

export interface ClassChangeListener<Values extends MorfixValues> {
    initialFormValues: (values: Values) => void;
    modifiedFormValues: (values: Values) => boolean;
}

export type ChangeListener<Values extends MorfixValues> = FunctionChangeListener<Values> | ClassChangeListener<Values>;

export interface MorfixConfig<Values extends MorfixValues> {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
    validationSchema?: Schema<Partial<Values> | undefined>;
    changeListener?: ChangeListener<Values>;
}
