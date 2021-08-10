import { joinPaths } from '../../src/utils/joinPaths';

describe('joinPaths', () => {
    it('should join paths', () => {
        expect(joinPaths('hello', 'this')).toBe('hello.this');
        expect(joinPaths('hello')).toBe('hello');
        expect(joinPaths('hello', 'this', 'is', 'test')).toBe('hello.this.is.test');
    });
    it('should filter empty paths', () => {
        expect(joinPaths('hello', false, '', null, 'test', null, null)).toBe('hello..test');
        expect(joinPaths(null, false, '', null)).toBe('');
        expect(joinPaths()).toBe('');
    });
    it("shouldn't filter number paths", () => {
        expect(joinPaths('hello', 0, 'b')).toBe('hello.0.b');
    });
});
