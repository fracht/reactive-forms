import { SetterOrUpdater, useRecoilState } from 'recoil';

import { useMorfixContext } from './useMorfixContext';

export const useDefaultFieldContext = <V>({ name }: { name: string }): [V, SetterOrUpdater<V>] => {
    const { registerField } = useMorfixContext();

    const [value, setValue] = useRecoilState<V>(registerField(name));

    return [value, setValue];
};
