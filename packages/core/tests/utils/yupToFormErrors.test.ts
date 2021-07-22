import { ValidationError } from 'yup';

import { yupToFormErrors } from '../../src/utils/yupToFormErrors';

describe('yupToFormErrors', () => {
    it('should convert without inner errors', () => {
        const error = {
            name: 'ValidationError',
            value: {},
            path: 'hello',
            type: 'required',
            errors: ['hello is a required field'],
            inner: [],
            message: 'hello is a required field',
            params: { path: 'hello' }
        };

        expect(yupToFormErrors(error)).toStrictEqual({
            hello: {
                $error: 'hello is a required field'
            }
        });
    });

    it('should not convert if no inner array specified', () => {
        const error = {
            name: 'ValidationError',
            value: {},
            path: 'hello',
            type: 'required',
            errors: ['hello is a required field'],
            message: 'hello is a required field',
            params: { path: 'hello' }
        };

        expect(yupToFormErrors(error as unknown as ValidationError)).toStrictEqual({});
    });

    it('should convert with inner errors', () => {
        const error = {
            name: 'ValidationError',
            value: { hello: { b: '', c: '' } },
            errors: ['hello.b is a required field', 'hello.a is a required field'],
            inner: [
                {
                    name: 'ValidationError',
                    value: '',
                    path: 'hello.b',
                    type: 'required',
                    errors: ['hello.b is a required field'],
                    inner: [],
                    message: 'hello.b is a required field',
                    params: { path: 'hello.b', value: '', originalValue: '' }
                },
                {
                    name: 'ValidationError',
                    path: 'hello.a',
                    type: 'required',
                    errors: ['hello.a is a required field'],
                    inner: [],
                    message: 'hello.a is a required field',
                    params: { path: 'hello.a' }
                }
            ],
            message: '2 errors occurred'
        };

        expect(yupToFormErrors(error as ValidationError)).toStrictEqual({
            hello: {
                a: {
                    $error: 'hello.a is a required field'
                },
                b: {
                    $error: 'hello.b is a required field'
                }
            }
        });
    });

    it('should not set two errors', () => {
        const error = {
            name: 'ValidationError',
            value: { hello: { b: '', c: '' } },
            errors: ['hello.b is a required field', 'hello.a is a required field'],
            inner: [
                {
                    name: 'ValidationError',
                    value: '',
                    path: 'hello.b',
                    type: 'required',
                    errors: ['hello.b is a required field'],
                    inner: [],
                    message: 'hello.b is a required field',
                    params: { path: 'hello.b', value: '', originalValue: '' }
                },
                {
                    name: 'ValidationError',
                    path: 'hello.b',
                    type: 'required',
                    errors: ['hello.a is a required field'],
                    inner: [],
                    message: 'hello.a is a required field',
                    params: { path: 'hello.a' }
                }
            ],
            message: '2 errors occurred'
        };

        expect(yupToFormErrors(error as ValidationError)).toStrictEqual({
            hello: {
                b: {
                    $error: 'hello.b is a required field'
                }
            }
        });
    });
});
