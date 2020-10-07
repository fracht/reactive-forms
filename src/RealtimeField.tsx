import React from 'react';

import { useDefaultFieldContext } from './DefaultFieldContext';
import { FieldProps, SharedFieldConfig } from './types';

export interface RealtimeFieldConfig<T> extends SharedFieldConfig<T> {}

export const useRealtimeField = (config: RealtimeFieldConfig<string>): FieldProps => {
    const [{ value, error }, { setValue }] = useDefaultFieldContext<string>(config);

    const { name } = config;

    return {
        name,
        value,
        error: error?.error_mrfx,
        onChange: (e) => setValue(e.target.value)
    };
};

export const RealtimeField = (
    config: RealtimeFieldConfig<string> & {
        children?: (props: FieldProps) => React.ReactElement;
    }
) => {
    const field = useRealtimeField(config);
    const { children } = config;
    return children ? children(field) : <input {...field} />;
};
