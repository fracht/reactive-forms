import React, { createContext, PropsWithChildren, useRef } from 'react';
import invariant from 'tiny-invariant';

import { Plugin } from '../typings/Plugin';
import { PluginArray } from '../typings/PluginArray';

export const MorfixPluginsContext = createContext<readonly Plugin[]>([]);

export type MorfixPluginsProps = PropsWithChildren<{
    plugins: PluginArray;
}>;

export const MorfixPlugins = ({ plugins, children }: MorfixPluginsProps) => {
    const tokenRef = useRef<Symbol>();

    if (tokenRef.current === undefined) {
        tokenRef.current = plugins.token;
    }

    invariant(
        tokenRef.current === plugins.token,
        "PluginArray token have changed. This means that you've modified your plugins runtime. PluginArray should never be modified / updated / extended."
    );

    return <MorfixPluginsContext.Provider value={plugins.plugins}>{children}</MorfixPluginsContext.Provider>;
};
