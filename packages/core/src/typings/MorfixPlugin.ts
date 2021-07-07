import { MorfixConfig, MorfixShared } from '../hooks';

export type MorfixPlugin = {
    token: Symbol;
    useDecorator: <T extends object>(morfix: MorfixShared<T>, config: MorfixConfig<T>) => MorfixShared<T>;
};
