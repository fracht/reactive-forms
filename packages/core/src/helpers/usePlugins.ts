import { useContext } from 'react';

import { FormPluginsContext } from '../components/Form/FormPlugins';
import { FormConfig, FormShared } from '../components/Form/useForm';

export const usePluginBagDecorators = <T extends Object>(bag: FormShared<T>, config: FormConfig<T>): FormShared<T> => {
	const plugins = useContext(FormPluginsContext);

	for (const plugin of plugins) {
		bag = plugin.useBagDecorator(bag, config);
	}

	return bag;
};

export const usePluginConfigDecorators = <T extends Object>(config: FormConfig<T>): FormConfig<T> => {
	const plugins = useContext(FormPluginsContext);

	let configCopy = { ...config };

	for (const plugin of plugins) {
		configCopy = plugin.useConfigDecorator(configCopy);
	}

	return configCopy;
};
