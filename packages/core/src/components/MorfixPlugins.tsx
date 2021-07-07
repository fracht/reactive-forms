import React, { createContext, PropsWithChildren } from 'react';

import { MorfixPlugin } from '../typings/MorfixPlugin';

export const MorfixPluginsContext = createContext<MorfixPlugin[]>([]);

export type MorfixPluginsProps = PropsWithChildren<{
    plugins: MorfixPlugin[];
}>;

export const MorfixPlugins = ({ plugins, children }: MorfixPluginsProps) => (
    <MorfixPluginsContext.Provider value={plugins}>{children}</MorfixPluginsContext.Provider>
);
