import { useCallback } from 'react';
import { useDefaultFieldContext } from './DefaultFieldContext';
import React from 'react';

export interface FieldConfig {
    name: string;
}

export interface FieldProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<{ value: string }>) => void;
}

export const useField = ({ name }: FieldConfig): FieldProps => {
    const [{ value }, { setValue }] = useDefaultFieldContext<string>(name);

    const onChange = useCallback(
        (e: React.ChangeEvent<{ value: string }>) => setValue(e.target.value),
        [setValue]
    );

    return {
        name,
        value,
        onChange
    };
};

export const Field = ({
    children,
    ...config
}: FieldConfig & { children?: (props: FieldProps) => React.ReactElement }) => {
    const field = useField(config);

    return children ? children(field) : <input {...field} />;
};
