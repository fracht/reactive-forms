import { createContext, useContext } from 'react';
import { MorfixContextType, MorfixValues } from './types';
import invariant from 'tiny-invariant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MorfixContext = createContext<MorfixContextType<any>>(
    (undefined as unknown) as MorfixContextType<MorfixValues>
);

export const useMorfixContext = <
    Values extends MorfixValues
>(): MorfixContextType<Values> => {
    const context = useContext(MorfixContext) as
        | MorfixContextType<Values>
        | undefined;

    invariant(
        context,
        '[useMorfixContext]: Morfix context is undefined. It looks like you are trying to access morfix context outside <Morfix> component'
    );

    return context;
};
