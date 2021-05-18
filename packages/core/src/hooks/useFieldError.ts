import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { META_KEY_ERRORS } from '../constants';
import { FieldError } from '../typings/FieldError';
import { joinPaths } from '../utils/joinPaths';

export const useFieldError = <V>(
    name: string
): [FieldError<V> | undefined, Dispatch<SetStateAction<FieldError<V> | undefined>>] => {
    const { formMeta } = useMorfixContext<object>();

    return useStockState(joinPaths(META_KEY_ERRORS, name), formMeta);
};
