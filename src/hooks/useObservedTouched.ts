import get from 'lodash/get';

import { useMorfixContext } from './useMorfixContext';
import { useNamedObservedState } from './useNamedObservedState';
import { MorfixTouched } from '../typings';

export const useObservedTouched = <V>(name: string): MorfixTouched<V> | undefined => {
    const { observeTouched: observe, stopObservingTouched: stopObserving, touched } = useMorfixContext();

    return useNamedObservedState({ observe, stopObserving, initialValue: () => get(touched.current, name), name });
};
