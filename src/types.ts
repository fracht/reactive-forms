export interface MorfixContextType<Values extends MorfixValues> {
    values: Values;
    setValues: (values: Values) => void;
}

export type MorfixShared<Values extends MorfixValues> = MorfixContextType<
    Values
>;

export type MorfixValues = object;
