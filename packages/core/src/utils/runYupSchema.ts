import { Schema, ValidateOptions } from 'yup';

import { isYupError } from './isYupError';
import { yupToMorfixErrors } from './yupToMorfixErrors';
import { FieldError } from '../typings';

export const runYupSchema = async <V>(
    schema: Schema<Partial<V> | undefined>,
    value: V,
    options?: ValidateOptions
): Promise<FieldError<V> | undefined> => {
    try {
        await schema.validate(value, options);
    } catch (error) {
        if (isYupError(error)) {
            return yupToMorfixErrors(error);
        } else {
            throw error;
        }
    }
    return undefined;
};
