import { useStockValue } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { FormMeta } from '../typings/FormMeta';

export const useMorfixMeta = <V>(name: keyof FormMeta): V => {
    const { formMeta } = useMorfixContext();

    return useStockValue<V, FormMeta>(name, formMeta);
};
