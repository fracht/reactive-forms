import React from 'react';
import { MorfixValues, MorfixShared } from './types';
import { MorfixContext } from './MorfixContext';
import { useMorfix } from './useMorfix';

type ChildrenCallback<Values extends MorfixValues> = (
    shared: MorfixShared<Values>
) => React.ReactNode;

export type MorfixChildren<Values extends MorfixValues> =
    | ChildrenCallback<Values>
    | React.ReactNode
    | React.ReactNodeArray;

export interface MorfixConfig<Values extends MorfixValues> {
    initialValues: Values;
    children: MorfixChildren<Values>;
}

export const Morfix = <Values extends MorfixValues>(
    config: MorfixConfig<Values>
) => {
    const { children } = config;
    const morfixBag = useMorfix(config);

    return (
        <MorfixContext.Provider value={morfixBag}>
            {typeof children === 'function' ? children(morfixBag) : children}
        </MorfixContext.Provider>
    );
};
