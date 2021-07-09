import { useContext } from 'react';

import { FormConfig, FormShared } from './useForm';
import { FormPluginsContext } from '../components/FormPlugins';

export const usePlugins = <T extends Object>(bag: FormShared<T>, config: FormConfig<T>): FormShared<T> => {
    const plugins = useContext(FormPluginsContext);

    for (const plugin of plugins) {
        bag = plugin.useDecorator(bag, config);
    }

    return bag;
};
