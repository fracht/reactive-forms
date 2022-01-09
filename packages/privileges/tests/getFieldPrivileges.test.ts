import { createPxth } from 'pxth';

import { getFieldPrivileges } from '../src/getFieldPrivileges';

describe('getFieldPrivileges', () => {
    it('should merge privileges from upper nodes', () => {
        const privileges = getFieldPrivileges<number, { some: { nested: { path: number } } }>(
            createPxth(['fields', 'some', 'nested', 'path']),
            {
                fields: {
                    some: {
                        isEditable: true,
                        nested: {
                            disabled: false,
                            path: {
                                visible: true
                            }
                        }
                    }
                }
            }
        );

        expect(privileges).toStrictEqual({
            isEditable: true,
            disabled: false,
            visible: true
        });
    });
});
