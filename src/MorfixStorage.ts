import { MutableRefObject, useRef } from 'react';
import { cloneDeep, set } from 'lodash';
import get from 'lodash/get';
import { atom, RecoilState, selector } from 'recoil';
import invariant from 'tiny-invariant';

import { parentPath, pickInnerPaths, relativePath } from './utils/pathUtils';
import { getFieldKey, getRawValueKey } from './constants';

export interface MorfixStorageConfig<Values> {
    initialValues: Values;
}

export interface MorfixStorageShared {
    registerField: <V>(name: string) => RecoilState<V>;
}

export type FieldRegistry = Record<string, FieldMeta<unknown>>;

export interface FieldMeta<V> {
    value: RecoilState<V>;
    rawValue?: RecoilState<V>;
    innerFields: string[];
}

const createIndependentField = <T, Values>(
    name: string,
    innerFields: string[],
    initialValues: Values
): FieldMeta<T> => ({
    innerFields,
    value: atom({
        key: getFieldKey(name),
        default: get(initialValues, name)
    })
});

const createDependentField = <T, Values>(
    name: string,
    innerFields: string[],
    initialValues: Values,
    registry: MutableRefObject<FieldRegistry>
): FieldMeta<T> => ({
    innerFields,
    rawValue: atom({
        key: getRawValueKey(name),
        default: get(initialValues, name)
    }),
    value: selector<unknown>({
        key: getFieldKey(name),
        get: ({ get: getRecoilValue }) => {
            const { rawValue: rawValueAtom, innerFields } = registry.current[name];

            invariant(rawValueAtom, 'Morfix caught error: the field graph is built incorrectly.');

            const rawValue = getRecoilValue(rawValueAtom);

            const output = cloneDeep(rawValue);

            for (const innerField of innerFields) {
                set(
                    output as object,
                    relativePath(name, innerField),
                    getRecoilValue(registry.current[innerField].value)
                );
            }

            return output;
        },
        set: ({ set: setRecoilValue }, value) => {
            const { innerFields, rawValue } = registry.current[name];

            invariant(rawValue, 'Morfix caught error: the field graph is built incorrectly.');

            for (const innerField of innerFields) {
                setRecoilValue(registry.current[innerField].value, get(value, relativePath(name, innerField)));
            }

            setRecoilValue(rawValue, value);
        }
    }) as RecoilState<T>
});

export const useMorfixStorage = <Values>({ initialValues }: MorfixStorageConfig<Values>): MorfixStorageShared => {
    const fieldRegistry = useRef<FieldRegistry>({});

    const registerField = <V>(name: string): RecoilState<V> => {
        if (!Object.prototype.hasOwnProperty.call(fieldRegistry.current, name)) {
            const allPaths = Object.keys(fieldRegistry.current);
            const parent = parentPath(name, allPaths);
            const innerFields = pickInnerPaths(name, allPaths);

            if (parent) {
                if (fieldRegistry.current[parent].innerFields.length === 0) {
                    fieldRegistry.current[parent] = createDependentField(parent, [name], initialValues, fieldRegistry);
                } else {
                    fieldRegistry.current[parent].innerFields.push(name);
                }
            }

            if (innerFields.length === 0) {
                fieldRegistry.current[name] = createIndependentField(name, innerFields, initialValues);
            } else {
                fieldRegistry.current[name] = createDependentField(name, innerFields, initialValues, fieldRegistry);
            }
        }

        return fieldRegistry.current[name].value as RecoilState<V>;
    };

    return {
        registerField
    };
};
