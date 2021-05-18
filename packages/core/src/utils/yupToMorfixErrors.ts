import get from 'lodash/get';
import set from 'lodash/set';
import toPath from 'lodash/toPath';
import { ValidationError } from 'yup';

import { getErrorPath } from '../constants';
import { FieldError } from '../typings/FieldError';

export const yupToMorfixErrors = <V>(yupError: ValidationError): FieldError<V> => {
    const isArr = yupError.inner?.some((value) => !isNaN(+toPath(value.path)[0]));

    const errors: FieldError<V> = isArr ? ([] as unknown as FieldError<V>) : ({} as FieldError<V>);

    if (yupError.inner) {
        if (yupError.inner.length === 0) {
            set(errors, getErrorPath(yupError.path), yupError.message);
        }
        for (const error of yupError.inner) {
            if (!get(errors, error.path)) {
                set(errors, getErrorPath(error.path), error.message);
            }
        }
    }

    return errors;
};
