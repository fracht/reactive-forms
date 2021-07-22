import React, { PropsWithChildren } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { createPluginArray, FormConfig, FormContext, FormPlugins, FormShared, useForm } from '@reactive-forms/core';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { domPlugin, TextFieldBag, useTextField } from '../src';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const renderUseTextField = <T extends object>(
    name: string,
    config: FormConfig<T>
): [RenderHookResult<undefined, TextFieldBag>, FormShared<T>] => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config), {
        wrapper: ({ children }) => <FormPlugins plugins={createPluginArray(domPlugin)}>{children}</FormPlugins>
    });

    return [
        renderHook(() => useTextField({ name }), {
            wrapper: ({ children }: PropsWithChildren<{}>) => (
                <FormPlugins plugins={createPluginArray(domPlugin)}>
                    <FormContext.Provider value={bag as unknown as FormShared<object>}>{children}</FormContext.Provider>
                </FormPlugins>
            )
        }),
        bag
    ];
};

describe('useTextField', () => {
    it('should change value', () => {
        const [{ result }, { values }] = renderUseTextField('hello', {
            initialValues: {
                hello: 'asdf'
            }
        });

        act(() => {
            const ref: React.MutableRefObject<HTMLInputElement> = { current: undefined };

            render(<input ref={ref} {...result.current} />, container);

            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
            ).set;
            nativeInputValueSetter.call(ref.current, 'new value');

            const ev2 = new Event('input', { bubbles: true });
            ref.current.dispatchEvent(ev2);
        });

        expect(values.getValues()).toStrictEqual({
            hello: 'new value'
        });

        expect(result.current.value).toBe('new value');
    });

    it('should set touched', () => {
        const [{ result }, { touched }] = renderUseTextField('hello', {
            initialValues: {
                hello: 'asdf'
            }
        });

        act(() => {
            const ref: React.MutableRefObject<HTMLInputElement> = { current: undefined };

            render(<input ref={ref} {...result.current} />, container);

            ref.current.focus();
            ref.current.blur();
        });

        expect(touched.getValues()).toStrictEqual({
            hello: {
                $touched: true
            }
        });
    });
});
