export type MorfixInnerError = {
    mrfxError?: string;
};

export type MorfixErrors<V> = V extends object
    ? V extends unknown[]
        ? MorfixErrors<V[number]>[] & MorfixInnerError
        : {
              [K in keyof V]?: MorfixErrors<V[K]>;
          } &
              MorfixInnerError
    : MorfixInnerError;
