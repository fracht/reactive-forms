import {
    isInnerPath,
    joinPaths,
    normalizePath,
    parentPath,
    pickInnerPaths,
    relativePath
} from '../../src/utils/pathUtils';

describe('normalizePath function tests', () => {
    it('"   hello.tst[0].b   " = "hello.tst.0.b"', () => {
        expect(normalizePath('   hello.tst[0].b   ')).toBe('hello.tst.0.b');
    });
});

describe('pickInnerPaths function tests', () => {
    it('simple inner paths', () => {
        expect(pickInnerPaths('hello', ['a', 'b', 'c', 'hello.a', 'hello.b', 'hello.sdf', 'helloa.c'])).toStrictEqual([
            'hello.a',
            'hello.b',
            'hello.sdf'
        ]);
    });
    it('inner paths with duplicates', () => {
        expect(
            pickInnerPaths('user', ['name', 'surname', 'user.meta.name', 'user.meta.surname', 'user.date'])
        ).toStrictEqual(['user.date', 'user.meta.name', 'user.meta.surname']);
        expect(pickInnerPaths('hello', ['b', 'c', 'hello.a', 'hello.a.b', 'hello.c', 'hello.c.a.d'])).toStrictEqual([
            'hello.a',
            'hello.c'
        ]);
    });
});

describe('isInnerPath function tests', () => {
    it('isInnerPath false', () => {
        expect(isInnerPath('hello', 'b')).toBe(false);
        expect(isInnerPath('hello', 'helloa')).toBe(false);
        expect(isInnerPath('hello', 'chello')).toBe(false);
        expect(isInnerPath('hello.asdf', 'hello.a')).toBe(false);
        expect(isInnerPath('hello.asdf', 'helloa')).toBe(false);
    });
    it('isInnerPath simple cases', () => {
        expect(isInnerPath('hello', 'hello.asdf')).toBe(true);
        expect(isInnerPath('hello', 'hello.asdf.asdf')).toBe(true);
        expect(isInnerPath('hello', 'hello.hello.hello')).toBe(true);
    });
    it('isInnerPath complex cases', () => {
        expect(isInnerPath('hello.asdf.bsdf', 'hello.asdf.bsdf.lol.k.w')).toBe(true);
        expect(isInnerPath('hello[0].bsdf', 'hello.0.bsdf.lol.k.w')).toBe(true);
    });
});

describe('parentPath function tests', () => {
    it('Parent path is undefined', () => {
        expect(parentPath('test', ['a', 'b', 'c', 'd', 'e'])).toBe(undefined);
        expect(parentPath('test', ['testa', 'testb', 'testc'])).toBe(undefined);
        expect(parentPath('test', ['atest', 'btest', 'ctest'])).toBe(undefined);
        expect(parentPath('a.b.test', ['a.b.ctest', 'a.b.testa', 'testc'])).toBe(undefined);
        expect(parentPath('b.c.d.e.test', ['b.c.d.e.atest', 'b.c.d.e.testb', 'b.c.d.e.testc'])).toBe(undefined);
    });
    it('Parent path is only 1 option in array', () => {
        expect(parentPath('a.b.test', ['c', 'b', 'a.b'])).toBe('a.b');
        expect(parentPath('a[0].test', ['c', 'b', 'a[0]'])).toBe('a[0]');
    });
    it('Few paths are valid as parent path. Checking if it picks right variant.', () => {
        expect(parentPath('a[0].test', ['a', 'b', 'a[0]'])).toBe('a[0]');
        expect(parentPath('a.b.test.hello', ['a', 'a.b', 'a.b.test'])).toBe('a.b.test');
    });
});

describe('relativePath function tests', () => {
    it('Simple path relativeness', () => {
        expect(relativePath('test', 'test.b.c')).toBe('b.c');
        expect(() => relativePath('test', 'testb.b.c')).toThrow();
        expect(relativePath('test', 'test')).toBe('');
    });
    it('Different path format relativeness', () => {
        expect(relativePath('test[0].b', 'test.0.b.c')).toBe('c');
        expect(relativePath('a.0.b', 'a[0].b.c')).toBe('c');
    });
});

describe('joinPaths function tests', () => {
    it('Simple join', () => {
        expect(joinPaths('a', 'b', 'c')).toBe('a.b.c');
        expect(joinPaths('a.a.a', 'b.c', 'd')).toBe('a.a.a.b.c.d');
        expect(joinPaths('a')).toBe('a');
    });

    it('Join with undefined', () => {
        expect(joinPaths('a', undefined, undefined, 'b')).toBe('a.b');
        expect(joinPaths(undefined, undefined, 'b')).toBe('b');
    });

    it('Join with empty strings', () => {
        expect(joinPaths('a', '', 'a.b.c', '')).toBe('a.a.b.c');
    });
});
