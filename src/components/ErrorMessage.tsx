import React from 'react';

import { useMorfixError, useMorfixTouched } from '../hooks';
import { MorfixErrors, MorfixTouched } from '../typings';

export type ErrorMessageProps<V = string> = {
    name: string;
    children?: (errors?: MorfixErrors<V>, touched?: MorfixTouched<V>) => React.ReactNode;
};

export const ErrorMessage = <V,>({ name, children }: ErrorMessageProps<V>) => {
    const [errors] = useMorfixError<V>(name);
    const [touched] = useMorfixTouched<V>(name);

    return (
        <React.Fragment>
            {children ? children(errors, touched) : touched?.mrfxTouched && errors?.mrfxError}
        </React.Fragment>
    );
};
