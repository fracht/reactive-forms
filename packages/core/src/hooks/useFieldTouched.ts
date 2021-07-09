import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useFormContext } from './useFormContext';
import { FieldTouched } from '../typings/FieldTouched';

export const useFieldTouched = <V>(
    name: string
): [FieldTouched<V> | undefined, Dispatch<SetStateAction<FieldTouched<V> | undefined>>] => {
    const { touched } = useFormContext<object>();

    return useStockState(name, touched);
};
