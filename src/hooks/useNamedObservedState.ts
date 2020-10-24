import { useCallback } from 'react';

import { useObservedState } from './useObservedState';
import { Observer } from '../utils/FunctionArray';

export type NamedObservedStateConfig<V> = {
    observe: (name: string, value: Observer<V>) => void;
    stopObserving: (name: string, value: Observer<V>) => void;
    initialValue: V | (() => V);
    name: string;
};

export const useNamedObservedState = <V>({
    observe: rawObserve,
    stopObserving: rawStopObserving,
    name,
    initialValue
}: NamedObservedStateConfig<V>): V => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const observe = useCallback((observer: Observer<V>) => rawObserve(name, observer), [name, rawObserve]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const stopObserving = useCallback((observer: Observer<V>) => rawStopObserving(name, observer), [
        name,
        rawStopObserving
    ]);

    return useObservedState({ initialValue, observe, stopObserving });
};
