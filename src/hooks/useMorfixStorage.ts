import { useRef } from 'react';
import { RecoilState } from 'recoil';

import { createDependentField } from '../recoil/createDependentField';
import { createIndependentField } from '../recoil/createIndependentField';
import { FieldMeta } from '../typings';
import { parentPath, pickInnerPaths } from '../utils/pathUtils';

export interface MorfixStorageConfig<Values> {
    initialValues: Values;
}

export interface MorfixStorageShared {
    registerField: <V>(name: string) => RecoilState<V>;
}

export type FieldRegistry = Record<string, FieldMeta<unknown>>;

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
