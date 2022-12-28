import React, { PropsWithChildren } from 'react';

import { ReactiveFormProvider } from './ReactiveFormProvider';
import { FormConfig, useForm } from '../hooks/useForm';

export type ReactiveFormProps<Values extends object> = PropsWithChildren<FormConfig<Values>>;

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
export const ReactiveForm = <Values extends object>({ children, ...config }: ReactiveFormProps<Values>) => {
	const formBag = useForm<Values>(config);

	return <ReactiveFormProvider formBag={formBag}>{children}</ReactiveFormProvider>;
};
