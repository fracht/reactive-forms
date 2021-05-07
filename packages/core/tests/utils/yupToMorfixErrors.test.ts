import { ValidationError } from 'yup';

import { yupToMorfixErrors } from '../../src/utils/yupToMorfixErrors';

describe('yupToMorfixErrors', () => {
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

        expect(yupToMorfixErrors(error)).toStrictEqual({
            hello: {
                mrfxError: 'hello is a required field'
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

        expect(yupToMorfixErrors(error as ValidationError)).toStrictEqual({});
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

        expect(yupToMorfixErrors(error as ValidationError)).toStrictEqual({
            hello: {
                a: {
                    mrfxError: 'hello.a is a required field'
                },
                b: {
                    mrfxError: 'hello.b is a required field'
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

        expect(yupToMorfixErrors(error as ValidationError)).toStrictEqual({
            hello: {
                b: {
                    mrfxError: 'hello.b is a required field'
                }
            }
        });
    });
});
