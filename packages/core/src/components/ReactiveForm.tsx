import React from 'react';

import { ReactiveFormProvider } from './ReactiveFormProvider';
import { FormConfig, FormShared, useForm } from '../hooks/useForm';

export type ReactiveFormProps<Values extends object> = FormConfig<Values> & {
	fallback?: React.ReactNode;
	children: (shared: FormShared<Values>) => React.ReactNode;
};

/**
 * This is main component. All fields should be inside this component.
 *
 * ## Example
 *
 * ```jsx live
 * <ReactiveForm initialValues={{ hello: 'asdf' }}>
 *     <div></div>
 * </ReactiveForm>
 * ```
 */
export const ReactiveForm = <Values extends object>({ children, fallback, ...config }: ReactiveFormProps<Values>) => {
	const formBag = useForm<Values>(config);

	return (
		<ReactiveFormProvider fallback={fallback} formBag={formBag}>
			{() => children(formBag)}
		</ReactiveFormProvider>
	);
};
