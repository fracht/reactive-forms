import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createPxth } from 'pxth';

import { PrivilegesContext, PrivilegesContextType, useFieldPrivileges } from '../src';

describe('UseFieldPrivileges', () => {
    it('should get privilege directly by path', () => {
        const privs = {
            visible: true,
            isEditable: false,
            disabled: true
        };

        const { result } = renderHook(() => useFieldPrivileges(createPxth(['fields', 'some', 'path'])), {
            wrapper: ({ children }) => (
                <PrivilegesContext.Provider
                    value={
                        {
                            fields: {
                                some: {
                                    path: privs
                                }
                            }
                        } as PrivilegesContextType<{ some: { path: number } }>
                    }
                >
                    {children}
                </PrivilegesContext.Provider>
            )
        });

        expect(result.current).toStrictEqual(privs);
    });

    it('should merge privileges from parent', () => {
        const privs = {
            visible: true,
            isEditable: false,
            disabled: true
        };

        const { result } = renderHook(() => useFieldPrivileges(createPxth(['fields', 'some', 'path'])), {
            wrapper: ({ children }) => (
                <PrivilegesContext.Provider
                    value={
                        {
                            fields: {
                                some: privs
                            }
                        } as PrivilegesContextType<{ some: { path: number } }>
                    }
                >
                    {children}
                </PrivilegesContext.Provider>
            )
        });

        expect(result.current).toStrictEqual(privs);
    });

    it('should merge privileges from multiple parents', () => {
        const { result } = renderHook(() => useFieldPrivileges(createPxth(['fields', 'some', 'path'])), {
            wrapper: ({ children }) => (
                <PrivilegesContext.Provider
                    value={
                        {
                            fields: {
                                disabled: false,
                                some: {
                                    isEditable: true,
                                    path: {
                                        visible: true
                                    }
                                }
                            }
                        } as PrivilegesContextType<{ some: { path: number } }>
                    }
                >
                    {children}
                </PrivilegesContext.Provider>
            )
        });

        expect(result.current).toStrictEqual({
            disabled: false,
            isEditable: true,
            visible: true
        });
    });

    it('should return partial privileges object', () => {
        const { result } = renderHook(() => useFieldPrivileges(createPxth(['fields', 'some', 'path'])), {
            wrapper: ({ children }) => (
                <PrivilegesContext.Provider
                    value={
                        {
                            fields: {
                                some: {
                                    isEditable: true,
                                    path: {
                                        visible: true
                                    }
                                }
                            }
                        } as PrivilegesContextType<{ some: { path: number } }>
                    }
                >
                    {children}
                </PrivilegesContext.Provider>
            )
        });

        expect(result.current).toStrictEqual({
            disabled: undefined,
            isEditable: true,
            visible: true
        });
    });
});
