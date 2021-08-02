import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { containsPlugin, createPluginArray, FormPlugins, Plugin, PluginArray, usePluginAssertion } from '../../src';

const renderUsePluginAssertion = (check: Plugin, specified: PluginArray) => {
    return renderHook(() => usePluginAssertion(check, 'Error!!!'), {
        wrapper: ({ children }) => <FormPlugins plugins={specified}>{children}</FormPlugins>
    });
};

describe('containsPlugin', () => {
    it('should return false', () => {
        const dummyDecorator = (value) => value;

        expect(
            containsPlugin(
                createPluginArray({
                    token: Symbol.for('b'),
                    useDecorator: dummyDecorator
                }).plugins,
                { token: Symbol.for('a'), useDecorator: dummyDecorator }
            )
        ).toBeFalsy();
    });

    it('should return true', () => {
        const dummyDecorator = (value) => value;

        expect(
            containsPlugin(
                createPluginArray({
                    token: Symbol.for('a'),
                    useDecorator: dummyDecorator
                }).plugins,
                { token: Symbol.for('a'), useDecorator: dummyDecorator }
            )
        ).toBeTruthy();
    });
});

describe('usePluginAssertion', () => {
    it('should throw error when plugin not found', () => {
        const dummyDecorator = (value) => value;

        const { result } = renderUsePluginAssertion(
            { token: Symbol.for('a'), useDecorator: dummyDecorator },
            createPluginArray({
                token: Symbol.for('b'),
                useDecorator: dummyDecorator
            })
        );

        expect(result.error).not.toBe(undefined);
    });

    it('should throw error when plugin array is empty', () => {
        const dummyDecorator = (value) => value;

        const { result } = renderUsePluginAssertion(
            { token: Symbol.for('a'), useDecorator: dummyDecorator },
            createPluginArray()
        );

        expect(result.error).not.toBe(undefined);
    });

    it('should not throw error when plugin is specified', () => {
        const dummyDecorator = (value) => value;

        const { result } = renderUsePluginAssertion(
            { token: Symbol.for('a'), useDecorator: dummyDecorator },
            createPluginArray({
                token: Symbol.for('a'),
                useDecorator: dummyDecorator
            })
        );

        expect(result.error).toBe(undefined);
    });
});
