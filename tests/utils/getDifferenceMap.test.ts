import { getDifferenceMap } from '../../src/utils/getDifferenceMap';

describe('getDifferenceMap', () => {
    it('should return map when objects are same', () => {
        let obj: any = {
            hello: 'a'
        };

        const equalityOutput = {
            '': true
        };

        expect(getDifferenceMap(obj, obj)).toStrictEqual(equalityOutput);

        obj = {
            h: {
                c: {
                    d: 'a'
                }
            },
            f: 'b'
        };

        expect(getDifferenceMap(obj, obj)).toStrictEqual(equalityOutput);

        obj = {
            arr: [0, 1, 2, 3],
            arr2: [
                {
                    h: 'a'
                },
                {
                    b: 'b'
                },
                {
                    c: new Date()
                }
            ]
        };

        expect(getDifferenceMap(obj, obj)).toStrictEqual(equalityOutput);

        expect(getDifferenceMap({}, {})).toStrictEqual(equalityOutput);

        expect(getDifferenceMap({ h: {} }, { h: {} })).toStrictEqual(equalityOutput);
    });

    it('should return diff map', () => {
        expect(
            getDifferenceMap(
                {
                    h: 'a'
                },
                {
                    h: 'b'
                }
            )
        ).toStrictEqual({ '': false });

        expect(
            getDifferenceMap(
                {
                    h: 'b',
                    c: {
                        a: 'h'
                    }
                },
                {
                    h: 'b',
                    c: {
                        a: 'b'
                    }
                }
            )
        ).toStrictEqual({ h: true, c: false });

        expect(
            getDifferenceMap(
                {
                    h: 'b',
                    c: {
                        a: 'h',
                        d: 'a'
                    }
                },
                {
                    h: 'b',
                    c: {
                        a: 'b',
                        d: 'a'
                    }
                }
            )
        ).toStrictEqual({ h: true, 'c.a': false, 'c.d': true });
    });

    it('should return diff with empty object', () => {
        expect(
            getDifferenceMap(
                {},
                {
                    h: 'b'
                }
            )
        ).toStrictEqual({ '': false });

        expect(
            getDifferenceMap(
                {
                    h: 'b'
                },
                {}
            )
        ).toStrictEqual({ '': false });

        expect(getDifferenceMap({}, {})).toStrictEqual({ '': true });
    });
});
