import { useContext } from 'react';

import { MorfixConfig, MorfixShared } from './useMorfix';
import { MorfixPluginsContext } from '../components/MorfixPlugins';

export const usePlugins = <T extends Object>(bag: MorfixShared<T>, config: MorfixConfig<T>): MorfixShared<T> => {
    const plugins = useContext(MorfixPluginsContext);

    for (const plugin of plugins) {
        bag = plugin.useDecorator(bag, config);
    }

    return bag;
};
