import React, { useCallback, useState, useEffect } from 'react';
import { useDefaultFieldContext } from './DefaultFieldContext';
import invariant from 'tiny-invariant';
import { SharedFieldConfig, FieldProps } from './types';

export interface FieldConfig<T> extends SharedFieldConfig {
    valueToString?: (value: T) => string;
    stringToValue?: (typed: string) => T;
}

const identityConverter = {
    valueToString: (value: unknown) => {
        invariant(
            typeof value === 'string',
            `⚠ Cannot use default(identity) converter for transforming "${typeof value}" to string. (Identity convert can be used only for "string"->"string" conversion)`
        );
        return value;
    },
    stringToValue: (value: string): unknown => value
};

export const useField = <T,>({
    name,
    valueToString = identityConverter.valueToString,
    stringToValue = identityConverter.stringToValue as (value: string) => T
}: FieldConfig<T>): FieldProps => {
    const [{ value, initialValue }, { setValue }] = useDefaultFieldContext<T>(
        name
    );

    const [typedValue, setTypedValue] = useState(valueToString(initialValue));

    const onChange = useCallback(
        (e: React.ChangeEvent<{ value: string }>) =>
            setTypedValue(e.target.value),
        []
    );

    const onBlur = () => setValue(stringToValue(typedValue));

    useEffect(() => {
        setTypedValue(valueToString(value));
    }, [value]);

    return {
        name,
        value: typedValue,
        onBlur,
        onChange
    };
};

export const Field = <T extends unknown = string>({
    children,
    ...config
}: FieldConfig<T> & {
    children?: (props: FieldProps) => React.ReactElement;
}) => {
    const field = useField(config);

    return children ? children(field) : <input {...field} />;
};