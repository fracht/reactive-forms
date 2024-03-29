import React from 'react';
import { renderHook } from '@testing-library/react';

import { createPluginArray, FormPlugins, Plugin, PluginArray, usePluginAssertion } from '../../src';

const renderUsePluginAssertion = (check: Plugin, specified: PluginArray) => {
	return renderHook(() => usePluginAssertion(check, 'Error!!!'), {
		wrapper: ({ children }) => <FormPlugins plugins={specified}>{children}</FormPlugins>,
	});
};

describe('usePluginAssertion', () => {
	it('should throw error when plugin not found', () => {
		const dummyDecorator = jest.fn((bag) => {
			return bag;
		});

		const assertPlugins = () => {
			renderUsePluginAssertion(
				{
					token: Symbol.for('a'),
					useBagDecorator: dummyDecorator,
					useConfigDecorator: dummyDecorator,
				},
				createPluginArray({
					token: Symbol.for('b'),
					useBagDecorator: dummyDecorator,
					useConfigDecorator: dummyDecorator,
				}),
			);
		};

		expect(assertPlugins).toThrow();
	});

	it('should throw error when plugin array is empty', () => {
		const dummyDecorator = jest.fn((bag) => {
			return bag;
		});

		const assertPlugins = () => {
			renderUsePluginAssertion(
				{
					token: Symbol.for('a'),
					useBagDecorator: dummyDecorator,
					useConfigDecorator: dummyDecorator,
				},
				createPluginArray(),
			);
		};

		expect(assertPlugins).toThrow();
	});

	it('should not throw error when plugin is specified', () => {
		const dummyDecorator = jest.fn((bag) => {
			return bag;
		});

		const assertPlugins = () => {
			renderUsePluginAssertion(
				{
					token: Symbol.for('a'),
					useBagDecorator: dummyDecorator,
					useConfigDecorator: dummyDecorator,
				},
				createPluginArray({
					token: Symbol.for('a'),
					useBagDecorator: dummyDecorator,
					useConfigDecorator: dummyDecorator,
				}),
			);
		};

		expect(assertPlugins).not.toThrow();
	});
});
