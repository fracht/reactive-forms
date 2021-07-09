import { useStockValue } from 'stocked';

import { useFormContext } from './useFormContext';
import { FormMeta } from '../typings/FormMeta';

export const useFormMeta = <V>(name: keyof FormMeta): V => {
    const { formMeta } = useFormContext();

    return useStockValue<V, FormMeta>(name, formMeta);
};
