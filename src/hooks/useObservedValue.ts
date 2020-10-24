import { get } from 'lodash';

import { useMorfixContext } from './useMorfixContext';
import { useNamedObservedState } from './useNamedObservedState';

export const useObservedValue = <V>(name: string): V => {
    const { observeValue: observe, stopObservingValue: stopObserving, values } = useMorfixContext();

    return useNamedObservedState({ observe, stopObserving, initialValue: () => get(values.current, name), name });
};
