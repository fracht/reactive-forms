import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { META_KEY_ERRORS } from '../constants';
import { MorfixErrors } from '../typings';
import { joinPaths } from '../utils/joinPaths';

export const useMorfixError = <V>(
    name: string
): [MorfixErrors<V> | undefined, Dispatch<SetStateAction<MorfixErrors<V> | undefined>>] => {
    const { formMeta } = useMorfixContext<object>();

    return useStockState(joinPaths(META_KEY_ERRORS, name), formMeta);
};
