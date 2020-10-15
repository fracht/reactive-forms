import { MorfixStorageConfig, MorfixStorageShared, useMorfixStorage } from './useMorfixStorage';

export type MorfixConfig<Values extends object> = {} & MorfixStorageConfig<Values>;

export type MorfixShared<Values> = MorfixStorageShared<Values>;

export const useMorfix = <Values extends object>({ ...storageConfig }: MorfixConfig<Values>): MorfixShared<Values> => {
    const storage = useMorfixStorage(storageConfig);

    return storage;
};
