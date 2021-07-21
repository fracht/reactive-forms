import type { Schema, ValidateOptions } from 'yup';

import { isYupError } from './isYupError';
import { yupToFormErrors } from './yupToFormErrors';
import { FieldError } from '../typings/FieldError';

export const runYupSchema = async <V>(
    schema: Schema<Partial<V> | undefined>,
    value: V,
    options?: ValidateOptions
): Promise<FieldError<V> | undefined> => {
    try {
        await schema.validate(value, options);
    } catch (error) {
        if (isYupError(error)) {
            return yupToFormErrors(error);
        } else {
            throw error;
        }
    }
    return undefined;
};
