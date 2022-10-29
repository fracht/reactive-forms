import { renderHook } from '@testing-library/react-hooks';
import React, { PropsWithChildren } from 'react';

import { createPluginArray, FormPlugins, Plugin, PluginArray, usePluginAssertion } from '../../src';

const renderUsePluginAssertion = (check: Plugin, specified: PluginArray) => {
	return renderHook(() => usePluginAssertion(check, 'Error!!!'), {
		wrapper: ({ children }: PropsWithChildren) => <FormPlugins plugins={specified}>{children}</FormPlugins>,
	});
};

describe('usePluginAssertion', () => {
	it('should throw error when plugin not found', () => {
		const dummyBagDecorator: Plugin['useBagDecorator'] = (value) => value;
		const dummyConfigDecorator: Plugin['useConfigDecorator'] = (value) => value;

		const { result } = renderUsePluginAssertion(
			{ token: Symbol.for('a'), useBagDecorator: dummyBagDecorator, useConfigDecorator: dummyConfigDecorator },
			createPluginArray({
				token: Symbol.for('b'),
				useBagDecorator: dummyBagDecorator,
				useConfigDecorator: dummyConfigDecorator,
			}),
		);

		expect(result.error).not.toBe(undefined);
	});

	it('should throw error when plugin array is empty', () => {
		const dummyBagDecorator: Plugin['useBagDecorator'] = (value) => value;
		const dummyConfigDecorator: Plugin['useConfigDecorator'] = (value) => value;

		const { result } = renderUsePluginAssertion(
			{ token: Symbol.for('a'), useBagDecorator: dummyBagDecorator, useConfigDecorator: dummyConfigDecorator },
			createPluginArray(),
		);

		expect(result.error).not.toBe(undefined);
	});

	it('should not throw error when plugin is specified', () => {
		const dummyBagDecorator: Plugin['useBagDecorator'] = (value) => value;
		const dummyConfigDecorator: Plugin['useConfigDecorator'] = (value) => value;

		const { result } = renderUsePluginAssertion(
			{ token: Symbol.for('a'), useBagDecorator: dummyBagDecorator, useConfigDecorator: dummyConfigDecorator },
			createPluginArray({
				token: Symbol.for('a'),
				useBagDecorator: dummyBagDecorator,
				useConfigDecorator: dummyConfigDecorator,
			}),
		);

		expect(result.error).toBe(undefined);
	});
});
