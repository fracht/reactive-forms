import { FieldError } from '../../src/typings/FieldError';
import { validatorResultToError } from '../../src/utils/validatorResultToError';

describe('validatorResultToError', () => {
    it('should convert primitive value to object', () => {
        expect(validatorResultToError('hello')).toStrictEqual({
            $error: 'hello'
        });

        expect(validatorResultToError(undefined)).toStrictEqual({
            $error: undefined
        });

        expect(validatorResultToError(null)).toStrictEqual({
            $error: undefined
        });

        expect(validatorResultToError(15 as any)).toStrictEqual({
            $error: undefined
        });
    });

    it('should not change object', () => {
        expect(validatorResultToError({ $error: 'lasdf' })).toStrictEqual({
            $error: 'lasdf'
        });

        expect(validatorResultToError({ a: { b: { $error: 'hello' } } } as FieldError<any>)).toStrictEqual({
            a: {
                b: {
                    $error: 'hello'
                }
            }
        });
    });
});
