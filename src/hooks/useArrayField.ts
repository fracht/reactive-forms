import { ArrayControl, useArrayControl } from './useArrayControl';
import { FieldContextConfig, useDefaultFieldContext } from './useDefaultFieldContext';
import { MorfixErrors, MorfixTouched } from '../typings';

export type ArrayFieldConfig<V> = FieldContextConfig<Array<V>>;

export type ArrayFieldProps<V> = {
    items: Array<V>;
    errors?: MorfixErrors<Array<V>>;
    touched?: MorfixTouched<Array<V>>;
} & ArrayControl<V>;

export const useArrayField = <V>({ ...fieldContextConfig }: ArrayFieldConfig<V>): ArrayFieldProps<V> => {
    const {
        value: items,
        meta: { error: errors, touched }
    } = useDefaultFieldContext<Array<V>>(fieldContextConfig);

    const control = useArrayControl<V>({ name: fieldContextConfig.name });

    return {
        items,
        errors,
        touched,
        ...control
    };
};
