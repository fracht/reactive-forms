import { useCallback } from 'react';

import { FieldContextConfig, useDefaultFieldContext } from './useDefaultFieldContext';

export type TextFieldConfig = {
    onChange?: (e: React.ChangeEvent<{ value: string }>) => void;
    onBlur?: (e: React.FocusEvent) => void;
} & FieldContextConfig<string>;

export type TextFieldInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<{ value: string }>) => void;
    onBlur: (e: React.FocusEvent) => void;
};

export type TextFieldMetaProps = {
    error?: string;
    touched?: boolean;
};

export type TextFieldProps = {
    field: TextFieldInputProps;
    meta: TextFieldMetaProps;
};

export const useTextField = ({ onChange, onBlur, ...fieldContextConfig }: TextFieldConfig): TextFieldProps => {
    const {
        value,
        control: { setValue, setTouched },
        meta: { error, touched }
    } = useDefaultFieldContext(fieldContextConfig);

    const handleChange = useCallback(
        (e: React.ChangeEvent<{ value: string }>) => {
            setValue(e.target.value);
            onChange?.(e);
        },
        [setValue, onChange]
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent) => {
            setTouched({ mrfxTouched: true });
            onBlur?.(e);
        },
        [setTouched, onBlur]
    );

    return {
        field: {
            value,
            onChange: handleChange,
            onBlur: handleBlur
        },
        meta: {
            error: error?.mrfxError,
            touched: touched?.mrfxTouched
        }
    };
};
