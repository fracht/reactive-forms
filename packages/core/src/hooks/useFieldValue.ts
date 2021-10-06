import { Pxth } from 'pxth';
import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useFormContext } from './useFormContext';

export const useFieldValue = <V>(name: Pxth<V>): [V, Dispatch<SetStateAction<V>>] => {
    const { values } = useFormContext<object>();

    return useStockState<V>(name, values);
};
