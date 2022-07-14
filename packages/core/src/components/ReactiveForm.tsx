import React from 'react';

import { ReactiveFormProvider } from './ReactiveFormProvider';
import { FormConfig, FormShared, useForm } from '../hooks/useForm';

export type ReactiveFormProps<Values extends object> = FormConfig<Values> & {
    children: ((shared: FormShared<Values>) => React.ReactNode) | React.ReactNode;
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
export const ReactiveForm = <Values extends object>({ children, ...config }: ReactiveFormProps<Values>) => {
    const formBag = useForm<Values>(config);

    return (
        <ReactiveFormProvider formBag={formBag}>
            {typeof children === 'function' ? children(formBag) : children}
        </ReactiveFormProvider>
    );
};
