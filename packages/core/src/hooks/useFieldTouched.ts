import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { useMorfixContext } from './useMorfixContext';
import { META_KEY_TOUCHED } from '../constants';
import { FieldTouched } from '../typings/MorfixTouched';
import { joinPaths } from '../utils/joinPaths';

export const useFieldTouched = <V>(
    name: string
): [FieldTouched<V> | undefined, Dispatch<SetStateAction<FieldTouched<V> | undefined>>] => {
    const { formMeta } = useMorfixContext<object>();

    return useStockState(joinPaths(META_KEY_TOUCHED, name), formMeta);
};
