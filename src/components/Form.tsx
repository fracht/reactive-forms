import React from 'react';

import { useSubmitAction } from '../hooks';
import { SubmitAction } from '../typings';

export type FormProps<V extends object> = React.PropsWithChildren<
    {
        submitAction?: SubmitAction<V>;
    } & React.FormHTMLAttributes<HTMLFormElement>
>;

export const Form = <V extends object>({ submitAction, children, ...other }: FormProps<V>) => {
    const handleSubmit = useSubmitAction(submitAction);

    return (
        <form
            {...other}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            {children}
        </form>
    );
};
