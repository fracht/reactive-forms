import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { META_KEY_TOUCHED } from '../constants';
import { MorfixTouched } from '../typings';
import { joinPaths } from '../utils/joinPaths';

export const useMorfixTouched = <V>(
    name: string
): [MorfixTouched<V> | undefined, Dispatch<SetStateAction<MorfixTouched<V> | undefined>>] => {
    const { formMeta } = useMorfixContext<object>();

    return useStockState(joinPaths(META_KEY_TOUCHED, name), formMeta);
};
