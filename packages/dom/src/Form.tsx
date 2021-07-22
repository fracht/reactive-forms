import React from 'react';
import { SubmitAction, useFormContext } from '@reactive-forms/core';

export type FormProps<Values extends object> = React.PropsWithChildren<{
    submitAction?: SubmitAction<Values>;
}>;

export const Form = <Values extends object>({ children, submitAction }: FormProps<Values>) => {
    const { submit } = useFormContext<Values>();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit(submitAction);
            }}
        >
            {children}
        </form>
    );
};
