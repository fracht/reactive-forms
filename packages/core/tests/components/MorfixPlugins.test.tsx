import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import {
    createPluginArray,
    MorfixConfig,
    MorfixContext,
    MorfixPlugins,
    MorfixShared,
    Plugin,
    PluginArray,
    useMorfix,
    useMorfixContext
} from '../../src';

const renderPlugins = <T extends object>(config: MorfixConfig<T>, plugins: PluginArray) => {
    return renderHook(() => useMorfix(config), {
        wrapper: ({ children, plugins }: React.PropsWithChildren<{ plugins: PluginArray }>) => (
            <MorfixPlugins plugins={plugins}>{children}</MorfixPlugins>
        ),
        initialProps: {
            plugins
        }
    });
};

const renderMorfix = <T extends object>(config: MorfixConfig<T>, plugins: PluginArray) => {
    const {
        result: { current: bag }
    } = renderPlugins(config, plugins);

    const wrapper = ({ children }) => (
        <MorfixContext.Provider value={bag as unknown as MorfixShared<object>}>{children}</MorfixContext.Provider>
    );

    return renderHook(() => useMorfixContext(), { wrapper });
};

describe('MorfixPlugins', () => {
    it('should call plugin', () => {
        const dummyDecorator = jest.fn((bag) => {
            return bag;
        });

        const dummyPlugin: Plugin = {
            token: Symbol.for('dummy'),
            useDecorator: dummyDecorator
        };

        renderMorfix(
            {
                initialValues: {}
            },
            createPluginArray(dummyPlugin)
        );

        expect(dummyDecorator).toBeCalledWith(expect.any(Object), {
            initialValues: {}
        });
    });

    it('should apply plugin', async () => {
        const dummyDecorator = jest.fn((bag) => {
            bag['hello'] = 'Hello world!';

            return bag;
        });

        const dummyPlugin: Plugin = {
            token: Symbol.for('dummy'),
            useDecorator: dummyDecorator
        };

        const { result } = renderMorfix(
            {
                initialValues: {}
            },
            createPluginArray(dummyPlugin)
        );

        expect(dummyDecorator).toBeCalledWith(expect.any(Object), {
            initialValues: {}
        });
        expect((result.current as any).hello).toBe('Hello world!');
    });

    it('should fail when plugin array updates', () => {
        const plugins = createPluginArray();

        const { rerender } = renderPlugins({ initialValues: {} }, plugins);

        expect(() =>
            act(() => {
                rerender({ plugins });
            })
        ).not.toThrow();

        expect(() =>
            act(() => {
                rerender({ plugins: createPluginArray() });
            })
        ).toThrow();
    });
});
