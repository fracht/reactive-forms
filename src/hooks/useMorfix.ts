import { MorfixStorageConfig, MorfixStorageShared, useMorfixStorage } from './useMorfixStorage';

export type MorfixConfig<Values extends object> = {} & MorfixStorageConfig<Values>;

export type MorfixShared = MorfixStorageShared;

export const useMorfix = <Values extends object>({ ...storageConfig }: MorfixConfig<Values>): MorfixShared => {
    const storage = useMorfixStorage(storageConfig);

    return storage;
};
