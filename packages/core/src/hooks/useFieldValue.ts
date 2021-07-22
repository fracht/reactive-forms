import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useFormContext } from './useFormContext';

export const useFieldValue = <V>(name: string): [V, Dispatch<SetStateAction<V>>] => {
    const { values } = useFormContext<object>();

    return useStockState<V>(name, values);
};
