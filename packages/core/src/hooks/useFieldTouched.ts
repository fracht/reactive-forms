import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { FieldTouched } from '../typings/FieldTouched';

export const useFieldTouched = <V>(
    name: string
): [FieldTouched<V> | undefined, Dispatch<SetStateAction<FieldTouched<V> | undefined>>] => {
    const { touched } = useMorfixContext<object>();

    return useStockState(name, touched);
};
