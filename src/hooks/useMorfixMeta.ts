import { useStockValue } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { MorfixMeta } from '../typings/MorfixMeta';

export const useMorfixMeta = <V>(name: keyof MorfixMeta): V => {
    const { formMeta } = useMorfixContext();

    return useStockValue<V, MorfixMeta>(name, formMeta);
};
