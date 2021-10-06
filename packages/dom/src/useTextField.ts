import { ChangeEvent, FocusEvent } from 'react';
import { useFormContext, usePluginAssertion } from '@reactive-forms/core';
import { Pxth, pxthToString } from 'pxth';
import { useStockValue } from 'stocked';

import { domPlugin } from './plugin';

export type TextFieldConfig = {
    name: Pxth<string>;
};

export type TextFieldBag = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
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
        name: pxthToString(name) as string,
        value
    };
};
