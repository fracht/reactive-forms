import { FormConfig, FormShared } from '../hooks/useForm';

export type Plugin = {
    token: Symbol;
    useDecorator: <T extends object>(form: FormShared<T>, config: FormConfig<T>) => FormShared<T>;
};
