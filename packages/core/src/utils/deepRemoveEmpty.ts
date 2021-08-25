import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { FieldError } from '../typings/FieldError';

type UnknownArrayErrorType = { $error: FieldError<unknown[]> | undefined } & Array<unknown>;

export const deepRemoveEmpty = (obj: object): object | undefined => {
    if (Array.isArray(obj)) {
        let error: FieldError<unknown[]> | undefined;
        if ('$error' in obj) {
            error = (obj as UnknownArrayErrorType).$error;
        }
        const newArr = obj.map((value) => (typeof value === 'object' ? deepRemoveEmpty(value) : value));
        if (error) (newArr as UnknownArrayErrorType).$error = error;
        return newArr.every(isNil) && !error ? undefined : newArr;
    } else if (obj !== null && typeof obj === 'object') {
        const newObj = Object.keys(obj).reduce((acc, key) => {
            const value = typeof obj[key] === 'object' ? deepRemoveEmpty(obj[key]) : obj[key];

            if (!isEmpty(value)) {
                acc[key] = value;
            }

            return acc;
        }, {});
        return isEmpty(newObj) ? undefined : newObj;
    }
    return undefined;
};
