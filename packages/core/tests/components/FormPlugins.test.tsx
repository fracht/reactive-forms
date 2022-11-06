import React, { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react';

import {
	createPluginArray,
	FormConfig,
	FormPlugins,
	Plugin,
	PluginArray,
	ReactiveFormProvider,
	useForm,
	useFormContext,
} from '../../src';

const renderPlugins = <T extends object>(config: FormConfig<T>, plugins: PluginArray) => {
	return renderHook(() => useForm(config), {
		wrapper: ({ children }) => <FormPlugins plugins={plugins}>{children}</FormPlugins>,
	});
};

const renderForm = <T extends object>(config: FormConfig<T>, plugins: PluginArray) => {
	const {
		result: { current: bag },
	} = renderPlugins(config, plugins);

	const wrapper = ({ children }: PropsWithChildren) => (
		<ReactiveFormProvider formBag={bag}>{() => children}</ReactiveFormProvider>
	);

	return renderHook(() => useFormContext(), { wrapper });
};

describe('FormPlugins', () => {
	it('should call plugin', () => {
		const dummyDecorator = jest.fn((bag) => {
			return bag;
		});

		const dummyPlugin: Plugin = {
			token: Symbol.for('dummy'),
			useBagDecorator: dummyDecorator,
			useConfigDecorator: dummyDecorator,
		};

		renderForm(
			{
				initialValues: {},
			},
			createPluginArray(dummyPlugin),
		);

		expect(dummyDecorator).toBeCalledWith(expect.any(Object), {
			initialValues: {},
		});
	});

	it('should apply plugin', async () => {
		const dummyDecorator = jest.fn((bag) => {
			bag['hello'] = 'Hello world!';

			return bag;
		});

		const dummyPlugin: Plugin = {
			token: Symbol.for('dummy'),
			useBagDecorator: dummyDecorator,
			useConfigDecorator: (a) => a,
		};

		const { result } = renderForm(
			{
				initialValues: {},
			},
			createPluginArray(dummyPlugin),
		);

		expect(dummyDecorator).toBeCalledWith(expect.any(Object), {
			initialValues: {},
		});
		expect((result.current as any).hello).toBe('Hello world!');
	});

	it('should fail when plugin array updates', async () => {
		const plugins = createPluginArray();

		const { rerender } = render(<FormPlugins plugins={plugins} />);

		expect(() => rerender(<FormPlugins plugins={plugins} />)).not.toThrow();
		expect(() => rerender(<FormPlugins plugins={createPluginArray()} />)).toThrow();
	});
});
