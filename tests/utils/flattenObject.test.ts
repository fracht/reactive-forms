import { flattenObject } from '../../src/utils/flattenObject';

describe('flattenObject', () => {
    it('should flatten map', () => {
        expect(flattenObject({ hello: 'a', bye: 'b' })).toStrictEqual({ hello: 'a', bye: 'b' });
        expect(flattenObject({ bye: 0, c: 'b' })).toStrictEqual({ bye: 0, c: 'b' });
    });
    it('should deeply flatten object', () => {
        const date = new Date();

        expect(
            flattenObject({
                hello: {
                    nested: {
                        value: 'asdf'
                    },
                    second: 'a'
                },
                date
            })
        ).toStrictEqual({
            'hello.nested.value': 'asdf',
            'hello.second': 'a',
            date: date
        });

        expect(
            flattenObject({
                arr: [
                    {
                        h: 'a'
                    },
                    {
                        b: 'b'
                    },
                    {
                        c: {
                            d: 'a'
                        }
                    }
                ]
            })
        ).toStrictEqual({
            'arr.0.h': 'a',
            'arr.1.b': 'b',
            'arr.2.c.d': 'a'
        });
    });
    it('should handle empty objects', () => {
        expect(flattenObject({})).toStrictEqual({});
    });
});
