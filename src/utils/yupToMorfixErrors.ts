import get from 'lodash/get';
import set from 'lodash/set';
import { ValidationError } from 'yup';

import { fieldNameToErrorPath } from './fieldNameToErrorPath';
import { FieldError, MorfixErrors } from '../types';

export const yupToMorfixErrors = <Values>(yupError: ValidationError): MorfixErrors<Values> => {
    let errors: MorfixErrors<Values> = {};

    if (yupError.inner) {
        if (yupError.inner.length === 0) {
            const error: FieldError = {
                message: yupError.message
            };
            return set(errors, fieldNameToErrorPath(yupError.path), error);
        }
        for (const err of yupError.inner) {
            if (!get(errors, err.path)) {
                const error: FieldError = {
                    message: err.message
                };
                errors = set(errors, fieldNameToErrorPath(err.path), error);
            }
        }
    }

    return errors;
};
