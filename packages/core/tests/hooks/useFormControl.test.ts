import { act, renderHook } from '@testing-library/react';
import { createPxth } from 'pxth';

import { FormControlConfig, useFormControl } from '../../src/hooks/useFormControl';

const renderFormControl = <T extends object>(config: FormControlConfig<T>) =>
	renderHook((props: FormControlConfig<T>) => useFormControl(props), {
		initialProps: config,
	});

describe('values control', () => {
	it('setValues', () => {
		const { result } = renderFormControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

		act(() => {
			result.current.setValues({ a: 'Hello world!' });
		});

		expect(result.current.values.getValues()).toStrictEqual({
			a: 'Hello world!',
		});
	});

	it('setFieldValue', () => {
		const { result } = renderFormControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

		act(() => {
			result.current.setFieldValue(createPxth(['hello', 'a', 'b']), 0);
		});

		expect(result.current.values.getValues()).toStrictEqual({
			a: 'asdf',
			hello: {
				a: {
					b: 0,
				},
			},
		});

		act(() => {
			result.current.setFieldValue(createPxth(['hello', 'a', 'b']), 'hello');
		});

		expect(result.current.values.getValues()).toStrictEqual({
			a: 'asdf',
			hello: {
				a: {
					b: 'hello',
				},
			},
		});
	});

	it('getFieldValue', () => {
		const { result } = renderFormControl({
			initialValues: { a: 'asdf', b: { j: 0 } },
			initialErrors: {},
			initialTouched: {},
		});

		expect(result.current.getFieldValue(createPxth(['a']))).toBe('asdf');
		expect(result.current.getFieldValue(createPxth(['b', 'j']))).toBe(0);
		expect(result.current.getFieldValue(createPxth(['b']))).toStrictEqual({
			j: 0,
		});
	});
});

describe('errors control', () => {
	it('setErrors', () => {
		const { result } = renderFormControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

		act(() => {
			result.current.setErrors({ a: { $error: 'Nested error' }, $error: 'Error' });
		});

		expect(result.current.errors.getValues()).toStrictEqual({
			$error: 'Error',
			a: {
				$error: 'Nested error',
			},
		});
	});

	it('setFieldError', () => {
		const { result } = renderFormControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

		act(() => {
			result.current.setFieldError(createPxth(['a']), { $error: 'hello' });
		});

		expect(result.current.errors.getValues()).toStrictEqual({
			a: {
				$error: 'hello',
			},
		});

		act(() => {
			result.current.setFieldError(createPxth(['hello', 'a', 'b']), { $error: 'bye' });
		});

		expect(result.current.errors.getValues()).toStrictEqual({
			a: expect.anything(),
			hello: {
				a: {
					b: {
						$error: 'bye',
					},
				},
			},
		});
	});

	it('getFieldError', () => {
		const { result } = renderFormControl({
			initialValues: { a: 'asdf', b: { j: 0 } },
			initialErrors: { a: { $error: 'asdf' }, b: { j: { $error: 'hello' } } },
			initialTouched: {},
		});

		expect(result.current.getFieldError(createPxth(['a']))).toStrictEqual({ $error: 'asdf' });
		expect(result.current.getFieldError(createPxth(['b', 'j']))).toStrictEqual({ $error: 'hello' });
		expect(result.current.getFieldError(createPxth(['b']))).toStrictEqual({
			j: {
				$error: 'hello',
			},
		});
	});
});

describe('touched control', () => {
	it('setTouched', () => {
		const { result } = renderFormControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

		act(() => {
			result.current.setTouched({ a: { $touched: true }, $touched: true });
		});

		expect(result.current.touched.getValues()).toStrictEqual({
			a: {
				$touched: true,
			},
			$touched: true,
		});
	});

	it('setFieldTouched', () => {
		const { result } = renderFormControl({ initialValues: { a: 'asdf' }, initialErrors: {}, initialTouched: {} });

		act(() => {
			result.current.setFieldTouched(createPxth(['a']), { $touched: true });
		});

		expect(result.current.touched.getValues()).toStrictEqual({
			a: {
				$touched: true,
			},
		});

		act(() => {
			result.current.setFieldTouched(createPxth(['hello', 'a', 'b']), { $touched: true });
		});

		expect(result.current.touched.getValues()).toStrictEqual({
			a: expect.anything(),
			hello: {
				a: {
					b: {
						$touched: true,
					},
				},
			},
		});
	});

	it('getFieldTouched', () => {
		const { result } = renderFormControl({
			initialValues: { a: 'asdf', b: { j: 0 } },
			initialErrors: {},
			initialTouched: { a: { $touched: true }, b: { j: { $touched: false } } },
		});

		expect(result.current.getFieldTouched(createPxth(['a']))).toStrictEqual({ $touched: true });
		expect(result.current.getFieldTouched(createPxth(['b', 'j']))).toStrictEqual({ $touched: false });
		expect(result.current.getFieldTouched(createPxth(['b']))).toStrictEqual({
			j: {
				$touched: false,
			},
		});
	});
});

describe('formMeta control', () => {
	it('test initial meta', () => {
		const { result } = renderFormControl({ initialValues: {}, initialErrors: {}, initialTouched: {} });

		expect(result.current.formMeta.getValues()).toStrictEqual({
			dirty: false,
			isSubmitting: false,
			isValid: true,
			isValidating: false,
			submitCount: 0,
		});
	});
	it('setFormMeta', () => {
		const { result } = renderFormControl({ initialValues: {}, initialErrors: {}, initialTouched: {} });

		const initialMeta = result.current.formMeta.getValues();

		const initialDirty = initialMeta.dirty;

		act(() => {
			result.current.setFormMeta(createPxth(['dirty']), !initialDirty);
		});

		expect(result.current.formMeta.getValues()).toStrictEqual({
			...initialMeta,
			dirty: !initialDirty,
		});
	});

	it('getFormMeta', () => {
		const { result } = renderFormControl({
			initialValues: {},
			initialErrors: {},
			initialTouched: {},
		});

		expect(result.current.getFormMeta(createPxth(['dirty']))).toBe(false);
		expect(result.current.getFormMeta(createPxth(['submitCount']))).toBe(0);
	});
});
