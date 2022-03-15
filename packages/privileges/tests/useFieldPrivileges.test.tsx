import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { renderHook } from '@testing-library/react-hooks';
import { createPxth } from 'pxth';

import { privilegesPlugin } from '../src/plugin';
import { defaultPrivileges, useFieldPrivileges } from '../src/useFieldPrivileges';

describe('UseFieldPrivileges', () => {
    it('should throw an error', () => {
        const { result } = renderHook(() => useFieldPrivileges(createPxth(['asdf'])), {
            wrapper: ({ children }) => <ReactiveForm initialValues={{}}>{() => children}</ReactiveForm>
        });

        expect(result.error).toBeDefined();
    });

    it('should return default privileges', () => {
        const { result } = renderHook(() => useFieldPrivileges(createPxth(['asdf'])), {
            wrapper: ({ children }) => (
                <FormPlugins plugins={createPluginArray(privilegesPlugin)}>
                    <ReactiveForm initialValues={{}}>{() => children}</ReactiveForm>
                </FormPlugins>
            )
        });

        expect(result.current).toStrictEqual(defaultPrivileges);
    });

    it('should return merged privileges', () => {
        const { result } = renderHook(() => useFieldPrivileges(createPxth(['some/', 'nested.', ']path['])), {
            wrapper: ({ children }) => (
                <FormPlugins plugins={createPluginArray(privilegesPlugin)}>
                    <ReactiveForm
                        initialValues={{
                            'some/': {
                                'nested.': {
                                    ']path[': 42
                                }
                            }
                        }}
                        privileges={{
                            fields: {
                                disabled: true,
                                'some/': {
                                    isEditable: false,
                                    visible: false,
                                    'nested.': {
                                        ']path[': {
                                            visible: true
                                        }
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

        expect(result.current).toStrictEqual({
            visible: true,
            isEditable: false,
            disabled: true
        });
    });
});
