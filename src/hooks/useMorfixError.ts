import { useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { MorfixErrors } from '../typings';

export const useMorfixError = <V>(name: string): [MorfixErrors<V>, (value: MorfixErrors<V>) => void] => {
    const { errors } = useMorfixContext<object>();

    return useStockState<MorfixErrors<V>>(name, errors);
};
