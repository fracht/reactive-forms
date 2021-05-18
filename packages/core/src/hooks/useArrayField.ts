import { ArrayControl, useArrayControl } from './useArrayControl';
import { FieldConfig, useField } from './useField';
import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/MorfixTouched';

export type ArrayFieldConfig<V> = FieldConfig<Array<V>>;

export type ArrayFieldProps<V> = {
    items: Array<V>;
    errors?: FieldError<Array<V>>;
    touched?: FieldTouched<Array<V>>;
} & ArrayControl<V>;

export const useArrayField = <V>({ ...fieldContextConfig }: ArrayFieldConfig<V>): ArrayFieldProps<V> => {
    const {
        value: items,
        meta: { error: errors, touched }
    } = useField<Array<V>>(fieldContextConfig);

    const control = useArrayControl<V>({ name: fieldContextConfig.name });

    return {
        items,
        errors,
        touched,
        ...control
    };
};
