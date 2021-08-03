import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { FormContext, FormShared, useForm } from '../../src';
import { useControlHandlers } from '../../src/hooks/useControlHandlers';

const {
    result: { current: bag }
} = renderHook(() =>
    useForm({
        initialValues: {
            test: 'hello'
        }
    })
);

const wrapper = ({ children }) => (
    <FormContext.Provider value={bag as unknown as FormShared<object>}>{children}</FormContext.Provider>
);

const { errors, values, touched, formMeta } = bag;
const {
    result: { current: control }
} = renderHook(() => useControlHandlers({ values, errors, touched, formMeta }), {
    wrapper
});

describe('should set and get single values', () => {
    it('FieldError', () => {
        act(() => {
            control.setFieldError('test', { $error: 'error' });
        });

        expect(control.getFieldError('test')).toStrictEqual({ $error: 'error' });
    });

    it('FieldTouched', () => {
        act(() => {
            control.setFieldTouched('test', { $touched: true });
        });

        expect(control.getFieldTouched('test')).toStrictEqual({ $touched: true });
    });

    it('FieldValue', () => {
        act(() => {
            control.setFieldValue('test', 'modified');
        });

        expect(control.getFieldValue('test')).toBe('modified');
    });

    it('FormMeta', () => {
        act(() => {
            control.setFormMeta('isSubmitting', true);
        });

        expect(control.getFormMeta('isSubmitting')).toBe(true);
    });
});

describe('should set all values', () => {
    it('setErrors', () => {
        act(() => {
            control.setErrors({ test: { $error: 'error2' } });
        });

        expect(control.getFieldError('test')).toStrictEqual({ $error: 'error2' });
    });

    it('setTouched', () => {
        act(() => {
            control.setTouched({ test: { $touched: true } });
        });

        expect(control.getFieldTouched('test')).toStrictEqual({ $touched: true });
    });

    it('setErrors', () => {
        act(() => {
            control.setValues({ test: 'modified2' });
        });

        expect(control.getFieldValue('test')).toBe('modified2');
    });
});
