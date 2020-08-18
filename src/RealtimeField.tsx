import React from 'react';
import { useDefaultFieldContext } from './DefaultFieldContext';
import { SharedFieldConfig, FieldProps } from './types';

export interface RealtimeFieldConfig extends SharedFieldConfig {}

export const useRealtimeField = ({ name }: RealtimeFieldConfig): FieldProps => {
    const [{ value }, { setValue }] = useDefaultFieldContext<string>(name);

    return {
        name,
        value,
        onChange: (e) => setValue(e.target.value)
    };
};

export const RealtimeField = (
    config: RealtimeFieldConfig & {
        children?: (props: FieldProps) => React.ReactElement;
    }
) => {
    const field = useRealtimeField(config);
    const { children } = config;
    return children ? children(field) : <input {...field} />;
};
