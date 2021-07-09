import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useFormContext } from './useFormContext';
import { FieldError } from '../typings/FieldError';

export const useFieldError = <V>(
    name: string
): [FieldError<V> | undefined, Dispatch<SetStateAction<FieldError<V> | undefined>>] => {
    const { errors } = useFormContext<object>();

    return useStockState(name, errors);
};
