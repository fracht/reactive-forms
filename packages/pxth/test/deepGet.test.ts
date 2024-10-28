import { describe, expect, it } from 'vitest';
import { deepGet, createPxth } from '../src';

describe('deep get', () => {
    it('should deeply get value', () => {
        expect(
            deepGet({ value: { a: 'hello' } }, createPxth(['value', 'a'])),
        ).toBe('hello');
    });

    it('should return all values', () => {
        expect(
            deepGet({ value: { a: 'hello' } }, createPxth([])),
        ).toStrictEqual({
            value: {
                a: 'hello',
            },
        });
    });
});
