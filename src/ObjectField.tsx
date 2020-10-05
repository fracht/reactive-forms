import { useCallback } from 'react';
import set from 'lodash/set';

import { useDefaultFieldContext } from './DefaultFieldContext';
import { SharedFieldConfig } from './types';

export interface ObjectFieldConfig<T> extends SharedFieldConfig<T> {}

export interface ObjectFieldProps<T extends Object> {
    value: T;
    setValue: (value: T) => void;
    setDeepValue: <V>(name: string, value: V) => void;
}

export const useObjectField = <T extends Object>(config: ObjectFieldConfig<T>): ObjectFieldProps<T> => {
    const [{ value }, { setValue }] = useDefaultFieldContext<T>(config);

    const setDeepValue = useCallback(
        <V,>(nestedName: string, newValue: V) => {
            const out = set(value, nestedName, newValue);
            setValue(out);
        },
        [setValue, value]
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
}: ObjectFieldConfig<T> & {
    children: (props: ObjectFieldProps<T>) => React.ReactElement;
}) => {
    const field = useObjectField<T>(config);
    return children(field);
};
