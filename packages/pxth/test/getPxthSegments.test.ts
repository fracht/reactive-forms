import { describe, expect, it } from 'vitest';
import { getPxthSegments, createPxth } from '../src';

describe('getPxthSegments', () => {
    it('should return all segments', () => {
        expect(getPxthSegments(createPxth(['hello', 'world']))).toStrictEqual([
            'hello',
            'world',
        ]);
        expect(getPxthSegments(createPxth([]))).toStrictEqual([]);
    });
});
