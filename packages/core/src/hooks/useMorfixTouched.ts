import { useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { MorfixTouched } from '../typings';

export const useMorfixTouched = <V>(
    name: string
): [MorfixTouched<V> | undefined, (value: MorfixTouched<V> | undefined) => void] => {
    const { touched } = useMorfixContext<object>();

    return useStockState<MorfixTouched<V> | undefined>(name, touched);
};
