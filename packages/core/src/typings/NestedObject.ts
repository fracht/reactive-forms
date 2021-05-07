export type NestedObject<Inner, V> = V extends object
    ? V extends unknown[]
        ? NestedObject<Inner, V[number]>[] & Inner
        : {
              [K in keyof V]?: NestedObject<Inner, V[K]>;
          } &
              Inner
    : Inner;
