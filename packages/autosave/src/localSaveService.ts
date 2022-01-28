import { AutoSaveService } from './AutoSaveService';

const prefix = 'reactiveForms';

export const localSaveService: AutoSaveService<unknown> = {
    save: async (key, value) => {
        localStorage.setItem(prefix.concat(key), JSON.stringify(value));
    },
    load: async (key) => {
        const item = localStorage.getItem(prefix.concat(key));

        if (typeof item === 'string') {
            return JSON.parse(item);
        }

        return undefined;
    }
};
