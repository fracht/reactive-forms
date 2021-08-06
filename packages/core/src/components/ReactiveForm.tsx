import React, { PropsWithChildren } from 'react';

import { ReactiveFormProvider } from './ReactiveFormProvider';
import { FormConfig, useForm } from '../hooks/useForm';

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
export const ReactiveForm = <Values extends object>({
    children,
    fallback,
    ...config
}: PropsWithChildren<FormConfig<Values> & { fallback?: React.ReactNode }>) => {
    const formBag = useForm<Values>(config);

    return (
        <ReactiveFormProvider fallback={fallback} formBag={formBag}>
            {children}
        </ReactiveFormProvider>
    );
};
