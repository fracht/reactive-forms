import { useDefaultFieldContext } from './DefaultFieldContext';
import { SharedFieldConfig } from './types';
import { useCallback } from 'react';
import { set } from 'lodash';

export interface ObjectFieldConfig extends SharedFieldConfig {}

export interface ObjectFieldProps<T extends Object> {
    value: T;
    setValue: (value: T) => void;
    setDeepValue: <V>(name: string, value: V) => void;
}

export const useObjectField = <T extends Object>({
    name
}: SharedFieldConfig): ObjectFieldProps<T> => {
    const [{ value }, { setValue }] = useDefaultFieldContext<T>(name);

    const setDeepValue = useCallback(
        <V,>(nestedName: string, newValue: V) => {
            const out = set(value, nestedName, newValue);
            setValue(out);
        },
        [name]
    );

    return {
        value,
        setValue,
        setDeepValue
    };
};

export const ObjectField = <T,>({
    children,
    ...config
}: ObjectFieldConfig & {
    children: (props: ObjectFieldProps<T>) => React.ReactElement;
}) => {
    const field = useObjectField<T>(config);
    return children(field);
};
