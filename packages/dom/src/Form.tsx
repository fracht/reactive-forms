import React, { useCallback } from 'react';
import { SubmitAction, useFormContext } from '@reactive-forms/core';

export type FormProps<Values extends object> = React.PropsWithChildren<{
    submitAction?: SubmitAction<Values>;
}>;

export const Form = <Values extends object>({ children, submitAction }: FormProps<Values>) => {
    const { submit, resetForm } = useFormContext<Values>();

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            submit(submitAction);
        },
        [submit, submitAction]
    );

    const onReset = useCallback(() => {
        resetForm();
    }, [resetForm]);

    return (
        <form onSubmit={onSubmit} onReset={onReset}>
            {children}
        </form>
    );
};
