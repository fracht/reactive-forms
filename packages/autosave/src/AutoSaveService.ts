import { AutoSaveKey } from './AutoSaveKey';

export type AutoSaveService<T> = {
    save: (autoSaveKey: AutoSaveKey, value: T) => Promise<void>;
    load: (autoSaveKey: AutoSaveKey) => Promise<T>;
};
