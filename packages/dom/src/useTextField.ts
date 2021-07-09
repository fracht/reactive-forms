import React from 'react';
import { useFormContext } from '@reactive-forms/core';

export type TextFieldConfig = {
    name: string;
};

export type TextFieldBag = {
    onChange: (e: React.ChangeEvent) => void;
    onBlur: (e: React.FocusEvent) => void;
    value: string;
    name: string;
};

export const useTextField = ({ name }: TextFieldConfig) => {
    const { values, errors, touched, handleChange, handleBlur } = useFormContext();

    return {
        handleChange,
        handleBlur
    };
};
