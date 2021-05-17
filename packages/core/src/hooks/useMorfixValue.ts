import { SetStateAction } from 'react';
import { Dispatch, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';

export const useMorfixValue = <V>(name: string): [V, Dispatch<SetStateAction<V>>] => {
    const { values } = useMorfixContext<object>();

    return useStockState<V>(name, values);
};
