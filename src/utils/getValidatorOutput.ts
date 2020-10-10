import { FieldError, FieldValidator, MorfixErrors } from '../types';

const isFieldError = (obj: unknown): obj is FieldError =>
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj).length === 1 &&
    Object.prototype.hasOwnProperty.call(obj, 'message');

export const getValidatorOutput = async <V>(
    validator: FieldValidator<V>,
    value: V
): Promise<MorfixErrors<V> | undefined> => {
    const error = await validator(value);

    if (typeof error === 'string') {
        return {
            error_mrfx: {
                message: error
            }
        } as MorfixErrors<V>;
    }

    if (isFieldError(error)) {
        return {
            error_mrfx: error
        } as MorfixErrors<V>;
    }

    return error ?? undefined;
};
