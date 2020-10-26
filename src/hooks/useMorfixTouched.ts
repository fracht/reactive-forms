import { useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { MorfixTouched } from '../typings';

export const useMorfixTouched = <V>(name: string): [MorfixTouched<V>, (value: MorfixTouched<V>) => void] => {
    const { touched } = useMorfixContext<object>();

    return useStockState<MorfixTouched<V>>(name, touched);
};
