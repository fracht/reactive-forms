import { describe, expect, it } from 'vitest';
import { deepSet, createPxth } from '../src';

describe('deepSet', () => {
    it('should deeply set value', () => {
        expect(deepSet({}, createPxth(['hello', 'world']), 'a')).toStrictEqual({
            hello: {
                world: 'a',
            },
        });
    });

    it('should return value', () => {
        expect(deepSet({}, createPxth([]), { obj: 'asdf' })).toStrictEqual({
            obj: 'asdf',
        });
    });
});
