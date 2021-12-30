import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFieldPrivileges, PrivilegesContext, PrivilegesContextType } from '../../src';
import { createPxth } from 'pxth';

describe('UseFieldPrivileges', () => {
    it('should get privilege by path', () => {
        const { result } = renderHook(() => useFieldPrivileges(createPxth(['fields', 'some', 'path'])), {
            wrapper: ({ children }) => (
                <PrivilegesContext.Provider
                    value={
                        {
                            fields: {
                                some: {
                                    path: {
                                        visible: true,
                                        isEditable: false,
                                        disabled: true
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

        console.log(result.current);
    });
});
