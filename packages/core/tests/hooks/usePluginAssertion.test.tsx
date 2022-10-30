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

		let error = null;

		try {
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
		} catch (err) {
			error = err;
		}

		expect(error).not.toBe(null);
	});

	it('should throw error when plugin array is empty', () => {
		const dummyDecorator = jest.fn((bag) => {
			return bag;
		});

		let error = null;

		try {
			renderUsePluginAssertion(
				{
					token: Symbol.for('a'),
					useBagDecorator: dummyDecorator,
					useConfigDecorator: dummyDecorator,
				},
				createPluginArray(),
			);
		} catch (err) {
			error = err;
		}

		expect(error).not.toBe(null);
	});

	it('should not throw error when plugin is specified', () => {
		const dummyDecorator = jest.fn((bag) => {
			return bag;
		});

		let error = null;

		try {
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
		} catch (err) {
			error = err;
		}

		expect(error).toBe(null);
	});
});
