import { MutableRefObject, useCallback, useDebugValue, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import invariant from 'tiny-invariant';

import { FunctionArray, Observer, ObserversArray } from '../utils/FunctionArray';
import { isInnerPath, normalizePath } from '../utils/pathUtils';
import { useLazyRef } from '../utils/useLazyRef';

export type ObservableStorage<T extends object> = {
    values: Readonly<MutableRefObject<T>>;
    observe: <V>(path: string, observer: Observer<V>) => void;
    stopObserving: <V>(path: string, observer: Observer<V>) => void;
    setValue: (path: string, value: unknown) => void;
    setValues: (values: T) => void;
    isObserved: (path: string) => boolean;
};

export type ObservableStorageProps<T extends object> = {
    initialValues: T;
    debugName?: string;
};

export const useObservableStorage = <T extends object>({
    initialValues,
    debugName
}: ObservableStorageProps<T>): ObservableStorage<T> => {
    const values = useLazyRef<T>(() => cloneDeep(initialValues));
    const observers = useRef<Record<string, ObserversArray<unknown>>>({});

    useDebugValue(debugName);

    const observe = useCallback(<V>(path: string, observer: Observer<V>) => {
        path = normalizePath(path);
        if (!Object.prototype.hasOwnProperty.call(observers.current, path)) {
            observers.current[path] = new FunctionArray();
        }
        observers.current[path].push(observer as Observer<unknown>);
    }, []);

    const stopObserving = useCallback(<V>(path: string, observer: Observer<V>) => {
        const currentObservers = observers.current[path];

        invariant(currentObservers, 'Cannot remove observer from value, which is not observing');

        currentObservers.remove(observer as Observer<unknown>);

        if (currentObservers.isEmpty()) delete observers.current[path];
    }, []);

    const setValue = useCallback(
        (path: string, value: unknown) => {
            set(values.current, path, value);

            const paths = Object.keys(observers.current).filter(
                (tempPath) => isInnerPath(path, tempPath) || path === tempPath || isInnerPath(tempPath, path)
            );

            paths.forEach((path) => {
                const observer = observers.current[path];
                const value = get(values.current, path);
                observer.call(typeof value === 'object' ? { ...value } : value);
            });
        },
        [values]
    );

    const setValues = useCallback(
        (newValues: T) => {
            values.current = newValues;
        },
        [values]
    );

    const isObserved = useCallback((path: string) => Object.prototype.hasOwnProperty.call(observers.current, path), []);

    return {
        values,
        observe,
        stopObserving,
        setValue,
        isObserved,
        setValues
    };
};
