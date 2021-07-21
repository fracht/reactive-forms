import React from 'react';
import { useFormContext, usePluginAssertion } from '@reactive-forms/core';
import { useStockValue } from 'stocked';

import { domPlugin } from './plugin';

export type TextFieldConfig = {
    name: string;
};

export type TextFieldBag = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
};

export const useTextField = ({ name }: TextFieldConfig): TextFieldBag => {
    usePluginAssertion(domPlugin, 'Dom plugin is required to use text field');

    const { handleChange, handleBlur, values } = useFormContext();

    const value = useStockValue<string>(name, values);

    return {
        onChange: handleChange,
        onBlur: handleBlur,
        name,
        value
    };
};
