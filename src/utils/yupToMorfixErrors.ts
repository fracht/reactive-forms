import { get, set } from 'lodash';
import { ValidationError } from 'yup';

import { fieldNameToErrorPath } from './fieldNameToErrorPath';
import { MorfixErrors } from '../types';

export const yupToMorfixErrors = <Values>(yupError: ValidationError): MorfixErrors<Values> => {
    let errors: MorfixErrors<Values> = {};

    if (yupError.inner) {
        if (yupError.inner.length === 0) {
            return set(errors, fieldNameToErrorPath(yupError.path), yupError.message);
        }
        for (const err of yupError.inner) {
            if (!get(errors, err.path)) {
                errors = set(errors, fieldNameToErrorPath(err.path), err.message);
            }
        }
    }

    return errors;
};
