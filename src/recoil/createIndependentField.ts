import { get } from 'lodash';
import { atom } from 'recoil';

import { getFieldKey } from '../constants';
import { FieldMeta } from '../typings/FieldMeta';

export const createIndependentField = <T, Values>(
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
