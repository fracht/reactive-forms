import { Schema } from 'yup';

import { isValidationError } from './isValidationError';
import { yupToMorfixErrors } from './yupToMorfixErrors';
import { MorfixErrors } from '../types';

export const runYupSchema = async <V>(schema: Schema<V>, value: V): Promise<MorfixErrors<V> | undefined> => {
    try {
        await schema.validate(value);
    } catch (err) {
        if (isValidationError(err)) {
            return yupToMorfixErrors<V>(err);
        } else {
            throw err;
        }
    }

    return undefined;
};
