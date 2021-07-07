import { MorfixConfig, MorfixShared } from '../hooks';

export type Plugin = {
    token: Symbol;
    useDecorator: <T extends object>(morfix: MorfixShared<T>, config: MorfixConfig<T>) => MorfixShared<T>;
};
