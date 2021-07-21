import { SetStateAction } from 'react';
import { Dispatch, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';

export const useFieldValue = <V>(name: string): [V, Dispatch<SetStateAction<V>>] => {
    const { values } = useMorfixContext<object>();

    return useStockState<V>(name, values);
};
