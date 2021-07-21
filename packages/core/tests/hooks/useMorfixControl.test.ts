import { act, renderHook } from '@testing-library/react-hooks';

import { MorfixControlConfig, useMorfixControl } from '../../src/hooks/useMorfixControl';

const renderMorfixControl = <T extends object>(config: MorfixControlConfig<T>) =>
    renderHook((props: MorfixControlConfig<T>) => useMorfixControl(props), {
        initialProps: config
    });

describe('values control', () => {
    it('setValues', () => {
        const { result } = renderMorfixControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

        act(() => {
            result.current.setValues({ a: 'Hello world!' });
        });

        expect(result.current.values.getValues()).toStrictEqual({
            a: 'Hello world!'
        });
    });

    it('setFieldValue', () => {
        const { result } = renderMorfixControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

        act(() => {
            result.current.setFieldValue('hello.a.b', 0);
        });

        expect(result.current.values.getValues()).toStrictEqual({
            a: 'asdf',
            hello: {
                a: {
                    b: 0
                }
            }
        });

        act(() => {
            result.current.setFieldValue('hello.a.b', 'hello');
        });

        expect(result.current.values.getValues()).toStrictEqual({
            a: 'asdf',
            hello: {
                a: {
                    b: 'hello'
                }
            }
        });
    });

    it('getFieldValue', () => {
        const { result } = renderMorfixControl({
            initialValues: { a: 'asdf', b: { j: 0 } },
            initialErrors: {},
            initialTouched: {}
        });

        expect(result.current.getFieldValue('a')).toBe('asdf');
        expect(result.current.getFieldValue('b.j')).toBe(0);
        expect(result.current.getFieldValue('b')).toStrictEqual({
            j: 0
        });
    });
});

describe('errors control', () => {
    it('setErrors', () => {
        const { result } = renderMorfixControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

        act(() => {
            result.current.setErrors({ a: { mrfxError: 'Nested error' }, mrfxError: 'Error' });
        });

        expect(result.current.errors.getValues()).toStrictEqual({
            mrfxError: 'Error',
            a: {
                mrfxError: 'Nested error'
            }
        });
    });

    it('setFieldError', () => {
        const { result } = renderMorfixControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

        act(() => {
            result.current.setFieldError('a', { mrfxError: 'hello' });
        });

        expect(result.current.errors.getValues()).toStrictEqual({
            a: {
                mrfxError: 'hello'
            }
        });

        act(() => {
            result.current.setFieldError('hello.a.b', { mrfxError: 'bye' });
        });

        expect(result.current.errors.getValues()).toStrictEqual({
            a: expect.anything(),
            hello: {
                a: {
                    b: {
                        mrfxError: 'bye'
                    }
                }
            }
        });
    });

    it('getFieldError', () => {
        const { result } = renderMorfixControl({
            initialValues: { a: 'asdf', b: { j: 0 } },
            initialErrors: { a: { mrfxError: 'asdf' }, b: { j: { mrfxError: 'hello' } } },
            initialTouched: {}
        });

        expect(result.current.getFieldError('a')).toStrictEqual({ mrfxError: 'asdf' });
        expect(result.current.getFieldError('b.j')).toStrictEqual({ mrfxError: 'hello' });
        expect(result.current.getFieldError('b')).toStrictEqual({
            j: {
                mrfxError: 'hello'
            }
        });
    });
});

describe('touched control', () => {
    it('setTouched', () => {
        const { result } = renderMorfixControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

        act(() => {
            result.current.setTouched({ a: { mrfxTouched: true }, mrfxTouched: true });
        });

        expect(result.current.touched.getValues()).toStrictEqual({
            a: {
                mrfxTouched: true
            },
            mrfxTouched: true
        });
    });

    it('setFieldTouched', () => {
        const { result } = renderMorfixControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

        act(() => {
            result.current.setFieldTouched('a', { mrfxTouched: true });
        });

        expect(result.current.touched.getValues()).toStrictEqual({
            a: {
                mrfxTouched: true
            }
        });

        act(() => {
            result.current.setFieldTouched('hello.a.b', { mrfxTouched: true });
        });

        expect(result.current.touched.getValues()).toStrictEqual({
            a: expect.anything(),
            hello: {
                a: {
                    b: {
                        mrfxTouched: true
                    }
                }
            }
        });
    });

    it('getFieldTouched', () => {
        const { result } = renderMorfixControl({
            initialValues: { a: 'asdf', b: { j: 0 } },
            initialErrors: {},
            initialTouched: { a: { mrfxTouched: true }, b: { j: { mrfxTouched: false } } }
        });

        expect(result.current.getFieldTouched('a')).toStrictEqual({ mrfxTouched: true });
        expect(result.current.getFieldTouched('b.j')).toStrictEqual({ mrfxTouched: false });
        expect(result.current.getFieldTouched('b')).toStrictEqual({
            j: {
                mrfxTouched: false
            }
        });
    });
});

describe('formMeta control', () => {
    it('test initial meta', () => {
        const { result } = renderMorfixControl({ initialValues: {}, initialErrors: {}, initialTouched: {} });

        expect(result.current.formMeta.getValues()).toStrictEqual({
            dirty: false,
            isSubmitting: false,
            isValid: true,
            isValidating: false,
            submitCount: 0
        });
    });
    it('setFormMeta', () => {
        const { result } = renderMorfixControl({ initialValues: {}, initialErrors: {}, initialTouched: {} });

        const initialMeta = result.current.formMeta.getValues();

        const initialDirty = initialMeta.dirty;

        act(() => {
            result.current.setFormMeta('dirty', !initialDirty);
        });

        expect(result.current.formMeta.getValues()).toStrictEqual({
            ...initialMeta,
            dirty: !initialDirty
        });
    });

    it('getFormMeta', () => {
        const { result } = renderMorfixControl({
            initialValues: {},
            initialErrors: {},
            initialTouched: {}
        });

        expect(result.current.getFormMeta('dirty')).toBe(false);
        expect(result.current.getFormMeta('submitCount')).toBe(0);
    });
});
