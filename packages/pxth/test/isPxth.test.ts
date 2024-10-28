import { describe, it, expect } from 'vitest';
import { isPxth, createPxth } from '../src';

describe('isPxth', () => {
    it('should check if an object is Pxth', () => {
        expect(isPxth(createPxth([]))).toBeTruthy();
        expect(isPxth({})).toBeFalsy();
        expect(
            isPxth({
                hello: 42,
            }),
        ).toBeFalsy();
    });

    it('should check for primitive', () => {
        expect(isPxth(0)).toBeFalsy();
        expect(isPxth('asdf')).toBeFalsy();
        expect(isPxth(Symbol())).toBeFalsy();
        expect(isPxth(new Date())).toBeFalsy();
    });
});
