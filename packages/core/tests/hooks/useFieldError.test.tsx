import React, { PropsWithChildren } from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { createPxth, Pxth } from 'pxth';
import { Dispatch } from 'stocked';

import { FieldError, FormConfig, FormShared, ReactiveFormProvider, useFieldError, useForm } from '../../src';

const renderFieldError = <V, T extends object>(
	name: Pxth<V>,
	config: FormConfig<T>,
): RenderHookResult<undefined, [FieldError<V>, Dispatch<FieldError<V>>]> => {
	const {
		result: { current: bag },
	} = renderHook(() => useForm(config));

	const wrapper = ({ children }: PropsWithChildren) => (
		<ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{children}</ReactiveFormProvider>
	);

	return renderHook(() => useFieldError<V>(name), { wrapper });
};

describe('useFieldError', () => {
	it('should return current error', () => {
		const { result: result1 } = renderFieldError(createPxth(['hello']), {
			initialValues: {
				hello: 'asd',
			},
			initialErrors: {
				hello: {
					$error: 'asdf',
				},
			},
		});

		expect(result1.current[0]).toStrictEqual({
			$error: 'asdf',
		});

		const { result: result2 } = renderFieldError(createPxth(['user', 'name']), {
			initialValues: {
				user: {
					name: 'Hello',
				},
			},
			initialErrors: {
				user: {
					name: {
						$error: 'errr',
					},
				},
			},
		});

		expect(result2.current[0]).toStrictEqual({
			$error: 'errr',
		});

		const { result: result3 } = renderFieldError(createPxth(['user']), {
			initialValues: {
				user: {
					name: 'Hello',
				},
			},
			initialErrors: {
				user: {
					name: {
						$error: 'errr',
					},
				},
			},
		});

		expect(result3.current[0]).toStrictEqual({
			name: {
				$error: 'errr',
			},
		});
	});

	it('should modify error', () => {
		const { result, rerender } = renderFieldError(createPxth(['hello']), {
			initialValues: {
				hello: 'asd',
			},
			initialErrors: {
				hello: {
					$error: 'asdf',
				},
			},
		});

		expect(result.current[0]).toStrictEqual({
			$error: 'asdf',
		});

		act(() => {
			result.current[1]({ $error: 'newError' });
			rerender();
		});

		expect(result.current[0]).toStrictEqual({
			$error: 'newError',
		});
	});
});
