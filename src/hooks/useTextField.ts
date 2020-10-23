import { useCallback } from 'react';

import { FieldContextProps, useDefaultFieldContext } from './useDefaultFieldContext';

export type TextFieldConfig = {
    onChange?: (e: React.ChangeEvent<{ value: string }>) => void;
    onBlur?: (e: React.FocusEvent) => void;
} & FieldContextProps<string>;

export type TextFieldInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<{ value: string }>) => void;
    onBlur: (e: React.FocusEvent) => void;
};

export type TextFieldMetaProps = {
    error?: string;
    touched?: boolean;
};

export const useTextField = ({
    onChange,
    onBlur,
    ...fieldContextConfig
}: TextFieldConfig): [TextFieldInputProps, TextFieldMetaProps] => {
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
        [setValue]
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent) => {
            setTouched({ mrfxTouched: true });
            onBlur?.(e);
        },
        [setTouched]
    );

    return [
        {
            value,
            onChange: handleChange,
            onBlur: handleBlur
        },
        {
            error: error?.mrfxError,
            touched: touched?.mrfxTouched
        }
    ];
};
