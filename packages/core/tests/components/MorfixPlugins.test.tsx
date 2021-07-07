import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
    MorfixConfig,
    MorfixContext,
    MorfixPlugin,
    MorfixPlugins,
    MorfixShared,
    useMorfix,
    useMorfixContext
} from '../../src';

const renderMorfix = <T extends object>(config: MorfixConfig<T>, plugins: MorfixPlugin[]) => {
    const {
        result: { current: bag }
    } = renderHook(() => useMorfix(config), {
        wrapper: ({ children }) => <MorfixPlugins plugins={plugins}>{children}</MorfixPlugins>
    });

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

        const dummyPlugin: MorfixPlugin = {
            token: Symbol.for('dummy'),
            useDecorator: dummyDecorator
        };

        renderMorfix(
            {
                initialValues: {}
            },
            [dummyPlugin]
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

        const dummyPlugin: MorfixPlugin = {
            token: Symbol.for('dummy'),
            useDecorator: dummyDecorator
        };

        const { result } = renderMorfix(
            {
                initialValues: {}
            },
            [dummyPlugin]
        );

        expect(dummyDecorator).toBeCalledWith(expect.any(Object), {
            initialValues: {}
        });
        expect((result.current as any).hello).toBe('Hello world!');
    });
});
