import React, { ReactNode, ReactNodeArray } from 'react';

import { FormContext, FormContextType } from './FormContext';
import { FormConfig, useForm } from '../hooks/useForm';

/**
 * This is main component. All fields should be inside this component.
 *
 * ## Example
 *
 * ```jsx live
 * <Form initialValues={{ hello: 'asdf' }}>
 *     <div></div>
 * </Form>
 * ```
 */
export const Form = <Values extends object>({
    children,
    ...config
}: FormConfig<Values> & { children: ReactNode | ReactNodeArray }) => {
    const formBag = useForm<Values>(config);

    return (
        <FormContext.Provider value={formBag as unknown as FormContextType<object>}>{children}</FormContext.Provider>
    );
};
