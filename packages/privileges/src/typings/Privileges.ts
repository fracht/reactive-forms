import { FieldPrivileges } from './FieldPrivileges';
import { ObjectPrivileges } from './ObjectPrivileges';

export type Privileges<T> = Extract<T, string | number | Date | boolean | null> extends never
    ? FieldPrivileges & ObjectPrivileges<T>
    : FieldPrivileges;
