import React, { PropsWithChildren } from 'react';
import {
	createPluginArray,
	FormConfig,
	FormPlugins,
	FormShared,
	ReactiveFormProvider,
	useForm,
} from '@reactive-forms/core';
import { act, fireEvent, render, renderHook, RenderHookResult } from '@testing-library/react';
import { createPxth, Pxth } from 'pxth';

import { domPlugin, TextFieldBag, useTextField } from '../src';

const renderUseTextField = <T extends object>(
	name: Pxth<string>,
	config: FormConfig<T>,
): [RenderHookResult<TextFieldBag, undefined>, FormShared<T>] => {
	const {
		result: { current: bag },
	} = renderHook(() => useForm(config), {
		wrapper: ({ children }) => <FormPlugins plugins={createPluginArray(domPlugin)}>{children}</FormPlugins>,
	});

	return [
		renderHook(() => useTextField({ name }), {
			wrapper: ({ children }: PropsWithChildren<{}>) => (
				<FormPlugins plugins={createPluginArray(domPlugin)}>
					<ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>
						{() => children}
					</ReactiveFormProvider>
				</FormPlugins>
			),
		}),
		bag,
	];
};

describe('useTextField', () => {
	it('should change value', async () => {
		const [{ result }, { values }] = renderUseTextField(createPxth(['hello']), {
			initialValues: {
				hello: 'asdf',
			},
		});
		const { getByRole } = render(<input role="input" {...result.current} />);

		await act(() => {
			fireEvent.change(getByRole('input'), { target: { name: result.current.name, value: 'new value' } });
		});

		expect(values.getValues()).toStrictEqual({
			hello: 'new value',
		});
		expect(result.current.value).toBe('new value');
	});
	it('should set touched', async () => {
		const [{ result }, { touched }] = renderUseTextField(createPxth(['hello']), {
			initialValues: {
				hello: 'asdf',
			},
		});
		const { getByRole } = render(<input role="input" {...result.current} />);

		await act(() => {
			fireEvent.blur(getByRole('input'), { target: { name: result.current.name } });
		});

		expect(touched.getValues()).toStrictEqual({
			hello: {
				$touched: true,
			},
		});
	});
});
