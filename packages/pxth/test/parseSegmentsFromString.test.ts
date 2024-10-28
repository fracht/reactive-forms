import { describe, it, expect } from 'vitest';
import { parseSegmentsFromString, RootPathToken } from '../src';

describe('parseSegmentsFromString', () => {
    it('should return array of segments', () => {
        expect(
            parseSegmentsFromString('hello.world.this.is.something'),
        ).toStrictEqual(['hello', 'world', 'this', 'is', 'something']);
    });

    it('should return empty array of segments', () => {
        expect(parseSegmentsFromString(RootPathToken)).toStrictEqual([]);
    });
});
