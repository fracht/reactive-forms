import React from 'react';

import { MorfixContext } from './MorfixContext';
import { MorfixChildren, MorfixConfig, MorfixValues } from './types';
import { useMorfix } from './useMorfix';

export const Morfix = <Values extends MorfixValues>(
    config: MorfixConfig<Values> & {
        children: MorfixChildren<Values>;
    }
) => {
    const { children } = config;
    const morfixBag = useMorfix<Values>(config);

    return (
        <MorfixContext.Provider value={morfixBag}>
            {typeof children === 'function' ? children(morfixBag) : children}
        </MorfixContext.Provider>
    );
};
