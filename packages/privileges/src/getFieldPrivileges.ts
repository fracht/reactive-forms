import { createPxth, deepGet, getPxthSegments, Pxth } from 'pxth';

import { FieldPrivileges } from './typings/FieldPrivileges';
import { FormPrivileges } from './typings/FormPrivileges';

const getParentPath = <V>(path: Pxth<V>) => {
    const pathSegments = getPxthSegments(path);

    if (pathSegments.length > 0) {
        pathSegments.pop();
    }

    return createPxth(pathSegments);
};

export const getFieldPrivileges = <V, T extends object>(
    path: Pxth<V>,
    privileges: FormPrivileges<T>
): FieldPrivileges => {
    const mergedPrivileges: FieldPrivileges = {};

    let currentPath = path as Pxth<unknown>;

    while (getPxthSegments(currentPath).length > 0) {
        const currentPrivileges: FieldPrivileges = deepGet(privileges.fields, path);

        if (currentPrivileges) {
            mergedPrivileges.disabled ??= currentPrivileges.disabled;
            mergedPrivileges.isEditable ??= currentPrivileges.isEditable;
            mergedPrivileges.visible ??= currentPrivileges.visible;
        }

        currentPath = getParentPath(path);
    }

    mergedPrivileges.disabled ??= privileges.fields.disabled;
    mergedPrivileges.isEditable ??= privileges.fields.isEditable;
    mergedPrivileges.visible ??= privileges.fields.visible;

    return mergedPrivileges;
};
