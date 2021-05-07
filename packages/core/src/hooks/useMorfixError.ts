import { useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { MorfixErrors } from '../typings';

export const useMorfixError = <V>(
    name: string
): [MorfixErrors<V> | undefined, (value: MorfixErrors<V> | undefined) => void] => {
    const { errors } = useMorfixContext<object>();

    return useStockState<MorfixErrors<V> | undefined>(name, errors);
};
