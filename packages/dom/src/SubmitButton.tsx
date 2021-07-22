import React, { useCallback } from 'react';
import { SubmitAction, useFormContext } from '@reactive-forms/core';

export type SubmitButtonProps<Values extends object> = {
    submitAction?: SubmitAction<Values>;
    children?: React.ReactNode | ((onSubmit: () => void) => React.ReactNode);
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>;

export const SubmitButton = <Values extends object>({
    children,
    submitAction,
    ...other
}: SubmitButtonProps<Values>) => {
    const { submit } = useFormContext<Values>();

    const onSubmit = useCallback(() => {
        submit(submitAction);
    }, [submit, submitAction]);

    return typeof children === 'function' ? (
        children(onSubmit)
    ) : (
        <button onClick={onSubmit} {...other}>
            {children}
        </button>
    );
};
