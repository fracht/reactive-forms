import React from 'react';

import { useFieldError } from '../hooks/useFieldError';
import { useFieldTouched } from '../hooks/useFieldTouched';
import { FieldError, FieldTouched } from '../typings';

export type ErrorMessageProps<V = string> = {
    name: string;
    children?: (errors?: FieldError<V>, touched?: FieldTouched<V>) => React.ReactNode;
};

export const ErrorMessage = <V,>({ name, children }: ErrorMessageProps<V>) => {
    const [errors] = useFieldError<V>(name);
    const [touched] = useFieldTouched<V>(name);

    return (
        <React.Fragment>
            {children ? children(errors, touched) : touched?.mrfxTouched && errors?.mrfxError}
        </React.Fragment>
    );
};
