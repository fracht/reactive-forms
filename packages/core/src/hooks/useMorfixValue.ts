import { useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';

export const useMorfixValue = <V>(name: string): [V, (value: V) => void] => {
    const { values } = useMorfixContext<object>();

    return useStockState<V>(name, values);
};
