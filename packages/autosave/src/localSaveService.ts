import invariant from 'tiny-invariant';
import { AutoSaveService } from './AutoSaveService';

const prefix = 'reactiveForms';

const isServer = () => typeof global.window === 'undefined';

export const localSaveService: AutoSaveService<unknown> = {
    save: (key, value) => {
        invariant(!isServer(), 'Cannot save values - LocalSaveService works only in browser.');

        localStorage.setItem(prefix.concat(key), JSON.stringify(value));
    },
    load: (key) => {
        if (isServer()) {
            console.warn('Warning! Values were not loaded, LocalSaveService works only in browser.');

            return null;
        }

        const item = localStorage.getItem(prefix.concat(key));

        if (typeof item === 'string') {
            return JSON.parse(item);
        }

        return null;
    }
};
