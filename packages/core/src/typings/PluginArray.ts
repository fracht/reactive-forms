import { Plugin } from './Plugin';

export type PluginArray = {
	token: Symbol;
	plugins: readonly Plugin[];
};

export const createPluginArray = (...plugins: Array<Plugin>): PluginArray => {
	const object = {
		token: Symbol(),
		plugins: Object.freeze(plugins.map(Object.freeze)) as Plugin[],
	};

	return Object.freeze(object);
};
