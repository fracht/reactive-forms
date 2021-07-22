import React from 'react';

import { FormContext, FormContextType } from './FormContext';
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
    ...config
}: FormConfig<Values> & { children: React.ReactNode | React.ReactNodeArray }) => {
    const formBag = useForm<Values>(config);

    return (
        <FormContext.Provider value={formBag as unknown as FormContextType<object>}>{children}</FormContext.Provider>
    );
};
