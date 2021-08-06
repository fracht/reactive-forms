import React from 'react';

import { FormContextType } from './FormContext';
import { useFormContext } from '../hooks/useFormContext';

export type ReactiveFormConsumerProps<Values extends object> = {
    children: (shared: FormContextType<Values>) => React.ReactNode;
};

export const ReactiveFormConsumer = <Values extends object>({ children }: ReactiveFormConsumerProps<Values>) => {
    const shared = useFormContext<Values>();

    return <React.Fragment>{children(shared)}</React.Fragment>;
};
