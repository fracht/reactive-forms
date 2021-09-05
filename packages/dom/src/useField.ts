import { ChangeEvent, FocusEvent } from 'react';
import { useFormContext, usePluginAssertion } from '@reactive-forms/core';
import { useStockValue } from 'stocked';

import { domPlugin } from './plugin';
import { TextInputElement } from './TextInputElement';

export type FieldConfig = {
    name: string;
};

export type FieldBag<V> = {
    onChange: (e: ChangeEvent<TextInputElement>) => void;
    onBlur: (e: FocusEvent<TextInputElement>) => void;
    value: V;
    name: string;
};

export const useField = <V>({ name }: FieldConfig): FieldBag<V> => {
    usePluginAssertion(domPlugin, 'Dom plugin is required to use useField hook');

    const { handleChange, handleBlur, values } = useFormContext();

    const value = useStockValue<V>(name, values);

    return {
        onChange: handleChange,
        onBlur: handleBlur,
        name,
        value
    };
};
