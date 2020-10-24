import { useEffect, useState } from 'react';

import { Observer } from '../utils/FunctionArray';

export type ObservedStateConfig<V> = {
    observe: (observer: Observer<V>) => void;
    stopObserving: (observer: Observer<V>) => void;
    initialValue: V | (() => V);
};

export const useObservedState = <V>({ initialValue, observe, stopObserving }: ObservedStateConfig<V>): V => {
    const [value, setValue] = useState<V>(initialValue);

    useEffect(() => {
        observe(setValue);
        return () => stopObserving(setValue);
    }, [observe, stopObserving]);

    return value;
};
