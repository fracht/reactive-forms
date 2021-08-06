import React, { PropsWithChildren } from 'react';

import { FormContext } from './FormContext';
import { FormShared } from '../hooks/useForm';

export type ReactiveFormProviderProps<Values extends object> = {
    formBag: FormShared<Values>;
    fallback?: React.ReactNode;
};

export const ReactiveFormProvider = <Values extends object>({
    children,
    formBag,
    fallback
}: PropsWithChildren<ReactiveFormProviderProps<Values>>) => {
    if (!formBag.isLoaded) {
        return <React.Fragment>{fallback}</React.Fragment>;
    }

    return <FormContext.Provider value={formBag as unknown as FormShared<object>}>{children}</FormContext.Provider>;
};
