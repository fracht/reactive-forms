import { describe, it, expect } from 'vitest';
import { relativePxth, createPxth, getPxthSegments } from '../src';

describe('relativePxth', () => {
    it('hit cases', () => {
        expect(() =>
            relativePxth(
                createPxth(['      ']),
                createPxth(['hello', 'world', 'this']),
            ),
        ).toThrow();
        expect(() =>
            relativePxth(
                createPxth([
                    'hello',
                    'world',
                    'this',
                    'is',
                    'not',
                    'parent',
                    'path',
                ]),
                createPxth([
                    'hello',
                    'world',
                    'this',
                    'is',
                    'not',
                    'nested',
                    'path',
                ]),
            ),
        ).toThrow();
        expect(
            getPxthSegments(
                relativePxth(
                    createPxth(['hello', 'world', '0', 'same']),
                    createPxth(['hello', 'world', '0', 'same']),
                ),
            ),
        ).toStrictEqual([]);
        expect(
            getPxthSegments(relativePxth(createPxth([]), createPxth([]))),
        ).toStrictEqual([]);
        expect(
            getPxthSegments(
                relativePxth(createPxth([]), createPxth(['nested', 'path'])),
            ),
        ).toStrictEqual(['nested', 'path']);
        expect(() =>
            relativePxth(createPxth(['helo']), createPxth([])),
        ).toThrow();
        expect(
            getPxthSegments(
                relativePxth(
                    createPxth(['', '', 'asdf']),
                    createPxth(['', '', 'asdf', 'lol']),
                ),
            ),
        ).toStrictEqual(['lol']);
    });
    it('simple cases', () => {
        expect(
            getPxthSegments(
                relativePxth(
                    createPxth(['hello', 'world']),
                    createPxth(['hello', 'world', 'nested', 'path']),
                ),
            ),
        ).toStrictEqual(['nested', 'path']);
        expect(
            getPxthSegments(
                relativePxth(
                    createPxth(['yes', 'this', 'is', '0', 'some', 'path']),
                    createPxth([
                        'yes',
                        'this',
                        'is',
                        '0',
                        'some',
                        'path',
                        'asdf',
                        'lol',
                    ]),
                ),
            ),
        ).toStrictEqual(['asdf', 'lol']);
    });
});
