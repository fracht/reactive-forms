import React from 'react';

import { useMorfixContext } from '../hooks/useMorfixContext';
import { useSubmitAction } from '../hooks/useSubmitAction';
import { SubmitAction } from '../typings/SubmitAction';

export type FormProps<V extends object> = React.PropsWithChildren<
    {
        submitAction?: SubmitAction<V>;
    } & React.FormHTMLAttributes<HTMLFormElement>
>;

export const Form = <V extends object>({ submitAction, children, ...other }: FormProps<V>) => {
    const handleSubmit = useSubmitAction(submitAction);
    const { resetForm } = useMorfixContext();

    return (
        <form
            {...other}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                other.onSubmit?.(e);
            }}
            onReset={(e) => {
                e.preventDefault();
                resetForm();
                other.onReset?.(e);
            }}
        >
            {children}
        </form>
    );
};
