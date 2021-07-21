import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useFormContext } from './useFormContext';
import { FieldError, FieldInnerError } from '../typings/FieldError';
import { NestedObject } from '../typings/NestedObject';

export const useFieldError = <V>(
    name: string
): [FieldError<V> | undefined, Dispatch<SetStateAction<FieldError<V> | undefined>>] => {
    const { errors } = useFormContext<object>();

    return useStockState(name, errors) as [
        NestedObject<FieldInnerError, V> | undefined,
        Dispatch<SetStateAction<NestedObject<FieldInnerError, V> | undefined>>
    ];
};
