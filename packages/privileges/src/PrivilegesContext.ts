import { createContext } from 'react';

type FieldPrivileges = {
    visible?: boolean;
    disabled?: boolean;
    isEditable?: boolean;
};

type PrimitivesToPrivileges<T> = Extract<T, string | number | Date | boolean | null> extends never
    ? FieldPrivileges & ObjectPrivileges<T>
    : FieldPrivileges;

type ObjectPrivileges<T> = {
    [P in keyof T]?: PrimitivesToPrivileges<T[P] extends Array<unknown> ? T[P][0] : T[P]>;
};

export type PrivilegesContextType<T extends object> = {
    fields: ObjectPrivileges<T>;
};

export const PrivilegesContext = createContext<PrivilegesContextType<object> | undefined>(undefined);
