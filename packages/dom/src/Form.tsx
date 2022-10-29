import { SubmitAction, useFormContext } from '@reactive-forms/core';
import React, { FormEvent, useCallback } from 'react';

export type FormProps<Values extends object> = React.PropsWithChildren<{
	submitAction?: SubmitAction<Values>;
}> &
	Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onReset' | 'onSubmit'>;

export const Form = <Values extends object>({ children, submitAction, ...other }: FormProps<Values>) => {
	const { submit, resetForm } = useFormContext<Values>();

	const onSubmit = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			submit(submitAction);
		},
		[submit, submitAction],
	);

	const onReset = useCallback(() => {
		resetForm();
	}, [resetForm]);

	return (
		<form onSubmit={onSubmit} onReset={onReset} {...other}>
			{children}
		</form>
	);
};
