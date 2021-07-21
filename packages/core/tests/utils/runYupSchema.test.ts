import { array, BaseSchema, number, object, string } from 'yup';

import { runYupSchema } from '../../src/utils/runYupSchema';

describe('value schema', () => {
    it('should validate string', async () => {
        const error = await runYupSchema(string().required('required'), '');

        expect(error).toStrictEqual({
            mrfxError: 'required'
        });
    });

    it('should validate number', async () => {
        const error = await runYupSchema(number().positive('positive'), -5);

        expect(error).toStrictEqual({
            mrfxError: 'positive'
        });
    });
});

describe('object schema', () => {
    it('should validate object', async () => {
        const errors = await runYupSchema(
            object().shape({
                a: string().required('required'),
                b: number().positive('positive')
            }),
            {
                a: '',
                b: -1
            },
            {
                abortEarly: false
            }
        );

        expect(errors).toStrictEqual({
            a: {
                mrfxError: 'required'
            },
            b: {
                mrfxError: 'positive'
            }
        });
    });

    it('should validate nested objects', async () => {
        const errors = await runYupSchema(
            object().shape({
                a: string().required('required'),
                b: object().shape({
                    c: string().required('required')
                })
            }),
            {
                a: '',
                b: {
                    c: undefined
                }
            },
            {
                abortEarly: false
            }
        );

        expect(errors).toStrictEqual({
            a: {
                mrfxError: 'required'
            },
            b: {
                c: {
                    mrfxError: 'required'
                }
            }
        });
    });
});

describe('array schema', () => {
    it('should validate arrays', async () => {
        const errors = await runYupSchema(array().of(string().required('required')), ['asdf', 'basdf', '', 'as', ''], {
            abortEarly: false
        });

        expect(errors).toEqual([
            undefined,
            undefined,
            {
                mrfxError: 'required'
            },
            undefined,
            {
                mrfxError: 'required'
            }
        ]);
    });
});

describe('throw not yup error', () => {
    it('should throw unexpected error', async () => {
        await expect(() => runYupSchema(null as unknown as BaseSchema<string>, 'a')).rejects.toBeTruthy();
    });
});

describe('valid input', () => {
    it('should return undefined', async () => {
        const errors = await runYupSchema(string().required(), 'hello');
        expect(errors).toBe(undefined);
    });
});
