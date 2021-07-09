import { FormConfig, FormShared } from '../hooks';

export type Plugin = {
    token: Symbol;
    useDecorator: <T extends object>(form: FormShared<T>, config: FormConfig<T>) => FormShared<T>;
};
