import { Pxth } from 'pxth';

import { getFieldPrivileges } from '../getFieldPrivileges';
import { usePrivilegesContext } from '../hooks/usePrivilegesContext';
import { FieldPrivileges } from '..';

export const useFieldPrivileges = <V>(path: Pxth<V>): FieldPrivileges => {
    const context = usePrivilegesContext();
    return getFieldPrivileges(path, context);
};
