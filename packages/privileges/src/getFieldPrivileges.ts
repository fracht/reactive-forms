import { createPxth, deepGet, getPxthSegments, Pxth, pxthToString, RootPathToken } from 'pxth';

import { FieldPrivileges } from './typings/FieldPrivileges';
import { FormPrivileges } from './typings/FormPrivileges';

const getParentPath = <V>(path: Pxth<V>) => {
    const pathSegments = getPxthSegments(path);

    if (pathSegments.length > 0) {
        pathSegments.pop();
    }

    return createPxth(pathSegments);
};

const mergePrivileges = <V, T extends object>(
    privs: FieldPrivileges,
    path: Pxth<V>,
    privileges: FormPrivileges<T>
): FieldPrivileges => {
    if (
        (privs.disabled !== undefined && privs.isEditable !== undefined && privs.visible !== undefined) ||
        pxthToString(path) === RootPathToken
    ) {
        return privs;
    }

    const currentPrivileges: FieldPrivileges = deepGet(privileges, path);
    if (currentPrivileges) {
        privs.disabled = privs.disabled ?? currentPrivileges.disabled;
        privs.isEditable = privs.isEditable ?? currentPrivileges.isEditable;
        privs.visible = privs.visible ?? currentPrivileges.visible;
    }

    const parentPath = getParentPath(path);

    return mergePrivileges(privs, parentPath, privileges);
};

export const getFieldPrivileges = <V, T extends object>(
    path: Pxth<V>,
    privileges: FormPrivileges<T>
): FieldPrivileges => {
    return mergePrivileges({}, path, privileges);
};
