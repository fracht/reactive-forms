import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { FormContext, FormShared, useForm } from '../../src';
import { useControlHandlers } from '../../src/hooks/useControlHandlers';

const renderControlHandlers = () => {
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

    return renderHook(() => useControlHandlers({ values, errors, touched, formMeta }), {
        wrapper
    });
};

describe('should set and get single values', () => {
    it('FieldError', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setFieldError('test', { $error: 'error' });
        });

        expect(result.current.getFieldError('test')).toStrictEqual({ $error: 'error' });
    });

    it('FieldTouched', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setFieldTouched('test', { $touched: true });
        });

        expect(result.current.getFieldTouched('test')).toStrictEqual({ $touched: true });
    });

    it('FieldValue', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setFieldValue('test', 'modified');
        });

        expect(result.current.getFieldValue('test')).toBe('modified');
    });

    it('FormMeta', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setFormMeta('isSubmitting', true);
        });

        expect(result.current.getFormMeta('isSubmitting')).toBe(true);
    });
});

describe('should set all values', () => {
    it('setErrors', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setErrors({ test: { $error: 'error2' } });
        });

        expect(result.current.getFieldError('test')).toStrictEqual({ $error: 'error2' });
    });

    it('setTouched', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setTouched({ test: { $touched: true } });
        });

        expect(result.current.getFieldTouched('test')).toStrictEqual({ $touched: true });
    });

    it('setErrors', () => {
        const { result } = renderControlHandlers();

        act(() => {
            result.current.setValues({ test: 'modified2' });
        });

        expect(result.current.getFieldValue('test')).toBe('modified2');
    });
});
