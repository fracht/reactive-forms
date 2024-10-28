/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

/**
 * Marker for branded "Pxth" type.
 */
declare const BrandKey: unique symbol;

/**
 * Type to get child paths for some type `T`.
 */
type PxthChildren<T> =
    /* Special case for any's - check tests at the end of file */
    boolean extends IsAny<T>
        ? /* Handle arrays & tuples */
          NonNullable<T> extends Array<any>
            ? {
                  /* Extract only item keys, ignore methods */
                  [K in Extract<
                      keyof NonNullable<T>,
                      `${number}` | number
                  >]: Pxth<NonNullable<T>[K] | Extract<T, null | undefined>>;
              } & {
                  length: Pxth<
                      NonNullable<T>['length'] | Extract<T, null | undefined>
                  >;
              }
            : /* Handle objects */
              NonNullable<T> extends object
              ? {
                    [K in keyof NonNullable<T>]-?: Pxth<
                        NonNullable<T>[K] | Extract<T, null | undefined>
                    >;
                }
              : {}
        : any;

/**
 * In Typescript, "any" type has special meaning - it can represent absolutely
 * *any* type. This leads to a bit weird behavior:
 * ```ts
 * type IsNumber<T> = T extends number ? true : false
 *
 * type A = IsNumber<number>;
 * //   ^? type A = true
 *
 * type B = IsNumber<string>;
 * //   ^? type B = false
 *
 * type C = IsNumber<any>;
 * //   ^? type C = boolean
 * ```
 * @see https://www.typescriptlang.org/play/?#code/C4TwDgpgBAkgzgOQK4FsBGEBOAeAKgPigF4pcoIAPYCAOwBM4obUNMoB+KYTJaALigAzAIYAbOBABQk0JCgBBYrEQss2Zuiz4A3JID0eqEYB67abOgAhJfGSaccbgEsaAcx37DJszPDQAwjYq9tjCNCAeBkZQpkA
 *
 * As you can see in example above, `type C` evaluates to boolean, because `any`
 * type activates both branches of `T extends number` condition.
 * Because of that, it is not trivial to check for any type.
 *
 * So, by bruteforce, this type was found:
 * ```ts
 * type A = IsAny<number>;
 * //   ^? type A = boolean
 *
 * type B = IsAny<string>;
 * //   ^? type B = boolean
 *
 * type C = IsAny<any>;
 * //   ^? type C = true
 * ```
 * @see https://www.typescriptlang.org/play/?#code/C4TwDgpgBAkgzgQQHYgDwBUB8UC8UAUAhilBAB7ARIAmcU6UA-FMAE4Cu0AXFAGaEAbOBACUAbgBQE0JCgJcsRClRJ2AWwBGEVpkkB6PVCMA9RlJnQAQgvjI0cNgEskAc10SDRqKfPhoAYRslNGIQd08TRiA
 *
 * I believe there should be a way to achieve same behavior simplier, but it
 * does the job.
 */
type IsAny<T> = any extends T ? true : false;

export type Pxth<V> = PxthChildren<V> & {
    /**
     * Not an actual value - used to trick TypeScript. The trick is that
     * Pxth does not contain any value V. However, we still need type
     * safety for this type. For instance, we cannot assign value of type
     * Pxth<number> to type Pxth<string>. So to achieve this behavior, we
     * assign value, that cannot be accessed (because BrandKey is not exported)
     *
     * This pattern is also called "opaque type" or "branded type".
     */
    readonly [BrandKey]: V;
};

if (import.meta.vitest) {
    const { describe, it, expectTypeOf } = await import('vitest');

    describe('Pxth<T> type tests', () => {
        it('should correctly handle primitive types', () => {
            expectTypeOf<Pxth<string>>().toMatchTypeOf<
                Pxth<string | undefined>
            >();
            expectTypeOf<Pxth<string | undefined>>().not.toMatchTypeOf<
                Pxth<string>
            >();
            expectTypeOf<Pxth<string>>().not.toMatchTypeOf<Pxth<number>>();
            expectTypeOf<Pxth<Date>>().not.toMatchTypeOf<Pxth<string>>();
        });

        it('should correctly work with objects', () => {
            expectTypeOf<Pxth<{ a: string; b: number }>>().toMatchTypeOf<
                Pxth<{ a: string }>
            >();
            expectTypeOf<Pxth<{ a: string; b: { c: number } }>>().toMatchTypeOf<
                Pxth<{ a: string }>
            >();
            expectTypeOf<Pxth<{ a: string }>>().toMatchTypeOf<
                Pxth<Record<string, string>>
            >();
        });

        it('should correctly extract child paths for objects', () => {
            expectTypeOf<Pxth<{ a: string; b: number }>['a']>().toEqualTypeOf<
                Pxth<string>
            >();
            expectTypeOf<
                Pxth<{ a: string; b: { c: number } }>['b']['c']
            >().toEqualTypeOf<Pxth<number>>();
            expectTypeOf<Pxth<Record<string, number>>['asdf']>().toEqualTypeOf<
                Pxth<number>
            >();
        });

        it('should respect null & undefined values for child paths in objects', () => {
            expectTypeOf<
                Pxth<{ a: string; b: number } | null>['a']
            >().toEqualTypeOf<Pxth<string | null>>();
            expectTypeOf<
                Pxth<{ a: string; b: { c: number } | undefined }>['b']['c']
            >().toEqualTypeOf<Pxth<number | undefined>>();
            expectTypeOf<
                Pxth<{ a: string | null | undefined }>['a']
            >().toEqualTypeOf<Pxth<string | null | undefined>>();
            expectTypeOf<
                Pxth<{ a: { b: Date | undefined } | null }>['a']['b']
            >().toEqualTypeOf<Pxth<Date | null | undefined>>();
        });

        it('should correctly handle arrays', () => {
            expectTypeOf<Pxth<string[]>[0]>().toEqualTypeOf<Pxth<string>>();
            expectTypeOf<Pxth<number[]>[1]>().toEqualTypeOf<Pxth<number>>();
            expectTypeOf<Pxth<Date[]>[number]>().toEqualTypeOf<Pxth<Date>>();
        });

        it('should correctly handle tuples', () => {
            expectTypeOf<Pxth<[string, number]>[0]>().toEqualTypeOf<
                Pxth<string>
            >();
            expectTypeOf<Pxth<[string, number]>[1]>().toEqualTypeOf<
                Pxth<number>
            >();
            expectTypeOf<Pxth<[Date]>[0]>().toEqualTypeOf<Pxth<Date>>();
        });

        it('should correctly handle null & undefined in arrays', () => {
            expectTypeOf<Pxth<string[] | null>[0]>().toEqualTypeOf<
                Pxth<string | null>
            >();
            expectTypeOf<
                Pxth<{ a: string | undefined }[]>[0]['a']
            >().toEqualTypeOf<Pxth<string | undefined>>();
            expectTypeOf<
                Pxth<(string | null)[] | undefined>[0]
            >().toEqualTypeOf<Pxth<string | null | undefined>>();
        });

        it('should correctly handle union types', () => {
            expectTypeOf<
                Pxth<{ a: string } | { a: number }>['a']
            >().toEqualTypeOf<Pxth<string | number>>();
        });

        it('should correctly handle `any` type', () => {
            expectTypeOf<Pxth<any>>().toMatchTypeOf<Pxth<string>>();
            expectTypeOf<Pxth<any>>().toMatchTypeOf<Pxth<number>>();
            expectTypeOf<Pxth<any>>().toMatchTypeOf<Pxth<{ a: string }>>();
            expectTypeOf<Pxth<any>>().toMatchTypeOf<Pxth<string[]>>();
            expectTypeOf<Pxth<any>>().toMatchTypeOf<Pxth<number[]>>();
        });
    });
}
