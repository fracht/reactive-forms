import invariant from 'tiny-invariant';

import { AutoSaveService } from './AutoSaveService';

const prefix = 'reactiveForms.';

const isServer = () => typeof global.window === 'undefined';

export const localSaveService: AutoSaveService<unknown> = {
	save: (key, value) => {
		invariant(!isServer(), 'Cannot create auto save - LocalSaveService works only in browser.');

		localStorage.setItem(prefix.concat(key), JSON.stringify(value));
	},
	load: async (key) => {
		if (isServer()) {
			// eslint-disable-next-line no-console
			console.warn('Warning! Values were not loaded, LocalSaveService works only in browser.');

			return [false, null];
		}

		const item = localStorage.getItem(prefix.concat(key));

		if (typeof item === 'string') {
			return [true, JSON.parse(item)];
		}

		return [false, null];
	},
	remove: (key) => {
		invariant(!isServer(), 'Cannot remove auto save - LocalSaveService works only in browser.');

		localStorage.removeItem(prefix.concat(key));
	},
};
