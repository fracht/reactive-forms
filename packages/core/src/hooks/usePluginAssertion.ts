import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { FormPluginsContext } from '../components';
import { Plugin } from '../typings';

export const usePluginAssertion = (plugin: Plugin, message: string) => {
    const plugins = useContext(FormPluginsContext);

    invariant(
        plugins.some((it) => it.token === plugin.token),
        message
    );
};
