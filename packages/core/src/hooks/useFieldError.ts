import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { FieldError } from '../typings/FieldError';

export const useFieldError = <V>(
    name: string
): [FieldError<V> | undefined, Dispatch<SetStateAction<FieldError<V> | undefined>>] => {
    const { errors } = useMorfixContext<object>();

    return useStockState(name, errors);
};
