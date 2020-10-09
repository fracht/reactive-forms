import React from 'react';
import { Schema } from 'yup';

import { MorfixContext } from './MorfixContext';
import { MorfixShared, MorfixValues, SubmitAction } from './types';
import { useMorfix } from './useMorfix';

type ChildrenCallback<Values extends MorfixValues> = (shared: MorfixShared<Values>) => React.ReactNode;

export type MorfixChildren<Values extends MorfixValues> =
    | ChildrenCallback<Values>
    | React.ReactNode
    | React.ReactNodeArray;

export interface MorfixConfig<Values extends MorfixValues> {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
    validationSchema?: Schema<Partial<Values> | undefined>;
}

export const Morfix = <Values extends MorfixValues>(
    config: MorfixConfig<Values> & {
        children: MorfixChildren<Values>;
    }
) => {
    const { children } = config;
    const morfixBag = useMorfix(config);

    return (
        <MorfixContext.Provider value={morfixBag}>
            {typeof children === 'function' ? children(morfixBag) : children}
        </MorfixContext.Provider>
    );
};
