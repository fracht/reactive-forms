import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { createPluginArray, FormPlugins, Plugin, PluginArray, usePluginAssertion } from '../../src';

const renderUsePluginAssertion = (check: Plugin, specified: PluginArray) => {
	return renderHook(() => usePluginAssertion(check, 'Error!!!'), {
		wrapper: ({ children }) => <FormPlugins plugins={specified}>{children}</FormPlugins>,
	});
};

describe('usePluginAssertion', () => {
	it('should throw error when plugin not found', () => {
		const dummyDecorator = (value) => value;

		const { result } = renderUsePluginAssertion(
			{ token: Symbol.for('a'), useBagDecorator: dummyDecorator, useConfigDecorator: dummyDecorator },
			createPluginArray({
				token: Symbol.for('b'),
				useBagDecorator: dummyDecorator,
				useConfigDecorator: dummyDecorator,
			}),
		);

		expect(result.error).not.toBe(undefined);
	});

	it('should throw error when plugin array is empty', () => {
		const dummyDecorator = (value) => value;

		const { result } = renderUsePluginAssertion(
			{ token: Symbol.for('a'), useBagDecorator: dummyDecorator, useConfigDecorator: dummyDecorator },
			createPluginArray(),
		);

		expect(result.error).not.toBe(undefined);
	});

	it('should not throw error when plugin is specified', () => {
		const dummyDecorator = (value) => value;

		const { result } = renderUsePluginAssertion(
			{ token: Symbol.for('a'), useBagDecorator: dummyDecorator, useConfigDecorator: dummyDecorator },
			createPluginArray({
				token: Symbol.for('a'),
				useBagDecorator: dummyDecorator,
				useConfigDecorator: dummyDecorator,
			}),
		);

		expect(result.error).toBe(undefined);
	});
});
