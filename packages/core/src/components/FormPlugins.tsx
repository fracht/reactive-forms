import React, { createContext, PropsWithChildren, useRef } from 'react';
import invariant from 'tiny-invariant';

import { Plugin } from '../typings/Plugin';
import { PluginArray } from '../typings/PluginArray';

export const FormPluginsContext = createContext<readonly Plugin[]>([]);

export type FormPluginsProps = PropsWithChildren<{
    plugins: PluginArray;
}>;

export const FormPlugins = ({ plugins, children }: FormPluginsProps) => {
    const tokenRef = useRef<Symbol>();

    if (tokenRef.current === undefined) {
        tokenRef.current = plugins.token;
    }

    invariant(
        tokenRef.current === plugins.token,
        "PluginArray token have changed. This means that you've modified your plugins runtime. PluginArray should never be modified / updated / extended."
    );

    return <FormPluginsContext.Provider value={plugins.plugins}>{children}</FormPluginsContext.Provider>;
};
