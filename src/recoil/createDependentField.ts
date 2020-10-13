import { MutableRefObject } from 'react';
import { cloneDeep, get, set } from 'lodash';
import { atom, RecoilState, selector } from 'recoil';
import invariant from 'tiny-invariant';

import { getFieldKey, getRawValueKey } from '../constants';
import { FieldRegistry } from '../hooks/useMorfixStorage';
import { FieldMeta } from '../typings/FieldMeta';
import { joinPaths } from '../utils/pathUtils';

export const createDependentField = <T, Values>(
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
                set(output as object, innerField, getRecoilValue(registry.current[joinPaths(name, innerField)].value));
            }

            return output;
        },
        set: ({ set: setRecoilValue }, value) => {
            const { innerFields, rawValue } = registry.current[name];

            invariant(rawValue, 'Morfix caught error: the field graph is built incorrectly.');

            for (const innerField of innerFields) {
                setRecoilValue(registry.current[joinPaths(name, innerField)].value, get(value, name, innerField));
            }

            setRecoilValue(rawValue, value);
        }
    }) as RecoilState<T>
});
