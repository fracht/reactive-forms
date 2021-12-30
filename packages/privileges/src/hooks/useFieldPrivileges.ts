import { usePrivilegesContext } from '../hooks/usePrivilegesContext';
import { Pxth, deepGet } from 'pxth';
import { Privileges } from '../PrivilegesContext';

export const useFieldPrivileges = <V>(path: Pxth<V>): Privileges<V> => {
    const privileges = usePrivilegesContext();
    return deepGet(privileges, path) as unknown as Privileges<V>;
};
