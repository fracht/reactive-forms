import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useFormContext } from './useFormContext';
import { FieldInnerTouched, FieldTouched } from '../typings/FieldTouched';
import { NestedObject } from '../typings/NestedObject';

export const useFieldTouched = <V>(
    name: string
): [FieldTouched<V> | undefined, Dispatch<SetStateAction<FieldTouched<V> | undefined>>] => {
    const { touched } = useFormContext<object>();

    return useStockState(name, touched) as [
        NestedObject<FieldInnerTouched, V> | undefined,
        Dispatch<SetStateAction<NestedObject<FieldInnerTouched, V> | undefined>>
    ];
};
