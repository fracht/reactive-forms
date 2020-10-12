import { MorfixStorageConfig, MorfixStorageShared, useMorfixStorage } from './MorfixStorage';

export type MorfixConfig<Values> = {} & MorfixStorageConfig<Values>;

export type MorfixShared = MorfixStorageShared;

export const useMorfix = <Values>({ ...storageConfig }: MorfixConfig<Values>): MorfixShared => {
    const storage = useMorfixStorage(storageConfig);

    return storage;
};
