import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { FormPluginsContext } from '../components/FormPlugins';
import { Plugin } from '../typings/Plugin';

export const containsPlugin = (plugins: readonly Plugin[], plugin: Plugin) =>
    plugins.some((it) => it.token === plugin.token);

export const usePluginAssertion = (plugin: Plugin, message: string) => {
    const plugins = useContext(FormPluginsContext);

    invariant(containsPlugin(plugins, plugin), message);
};
