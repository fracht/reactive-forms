import { useFormContext, usePluginAssertion } from '@reactive-forms/core';
import { Pxth } from 'pxth';

import { FieldPrivileges } from './typings/FieldPrivileges';
import { getFieldPrivileges } from './getFieldPrivileges';
import { privilegesPlugin } from './plugin';

export const useFieldPrivileges = <V>(path: Pxth<V>): FieldPrivileges => {
    usePluginAssertion(
        privilegesPlugin,
        'Privileges plugin is required to use privileges. Please add privilegesPlugin to <FormPlugins>.'
    );

    const context = useFormContext();

    return getFieldPrivileges(path, context.privileges);
};
