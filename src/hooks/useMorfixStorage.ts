import { useRef } from 'react';
import { cloneDeep, get, set, toPath } from 'lodash';

import { Observable } from '../utils/Observer';
import { isInnerPath } from '../utils/pathUtils';
import { useLazyRef } from '../utils/useLazyRef';

export interface MorfixStorageConfig<Values extends object> {
    initialValues: Values;
}

export interface MorfixStorageShared {
    registerField: <V>(name: string, observer: (value: V) => void) => void;
    setFieldValue: <V>(name: string, value: V) => void;
}

export type FieldObservers<V> = {
    value: Observable<V>;
};

export type FieldRegistry = Record<string, FieldObservers<unknown>>;

export const useMorfixStorage = <Values extends object>({
    initialValues
}: MorfixStorageConfig<Values>): MorfixStorageShared => {
    const values = useLazyRef(() => cloneDeep(initialValues));

    const registry = useRef<FieldRegistry>({});

    const registerField = <V>(name: string, observer: (value: V) => void) => {
        if (!Object.prototype.hasOwnProperty.call(registry.current, name)) {
            registry.current[toPath(name).join('.')] = {
                value: new Observable<V>()
            } as FieldObservers<unknown>;
        }

        (registry.current[name] as FieldObservers<V>).value.subscribe(observer);

        observer(get(values.current, name));

        return registry.current[name];
    };

    const setFieldValue = <V>(name: string, value: V) => {
        set(values.current, name, value);

        const paths = Object.keys(registry.current).filter(
            (tempName) => isInnerPath(name, tempName) || name === tempName || isInnerPath(tempName, name)
        );

        paths.forEach((path) => {
            const value = get(values.current, path);
            registry.current[path].value.notifyAll(typeof value === 'object' ? { ...value } : value);
        });
    };

    return {
        registerField,
        setFieldValue
    };
};
