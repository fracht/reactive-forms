import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { renderHook } from '@testing-library/react-hooks';
import { createPxth } from 'pxth';

import { privilegesPlugin } from '../src/plugin';
import { useFieldPrivileges } from '../src/useFieldPrivileges';

describe('UseFieldPrivileges', () => {
    it('should return privileges', () => {
        const privs = {
            visible: true,
            isEditable: false,
            disabled: true
        };

        const { result } = renderHook(() => useFieldPrivileges(createPxth(['fields', 'some', 'path'])), {
            wrapper: ({ children }) => (
                <FormPlugins plugins={createPluginArray(privilegesPlugin)}>
                    <ReactiveForm<{ some: { path: number } }>
                        initialValues={{ some: { path: 1 } }}
                        // FIXME typescript can't find types
                        privileges={{
                            fields: {
                                some: {
                                    disabled: true,
                                    path: {
                                        visible: true,
                                        isEditable: false
                                    }
                                }
                            }
                        }}
                    >
                        {() => children}
                    </ReactiveForm>
                </FormPlugins>
            )
        });

        expect(result.current).toStrictEqual(privs);
    });
});
