import { AutoSaveKey } from './AutoSaveKey';

export type AutoSaveService<T> = {
    save: (autoSaveKey: AutoSaveKey, value: T) => void;
    load: (autoSaveKey: AutoSaveKey) => [loaded: boolean, value: T | null];
    remove: (autoSaveKey: AutoSaveKey) => void;
};
