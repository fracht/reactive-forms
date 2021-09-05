import React, { PropsWithChildren } from 'react';
import {
    createPluginArray,
    FormConfig,
    FormPlugins,
    FormShared,
    ReactiveFormProvider,
    useForm
} from '@reactive-forms/core';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { mount } from 'enzyme';

import { domPlugin, FieldBag, useField } from '../src';

const renderUseField = <V, T extends object = {}>(
    name: string,
    config: FormConfig<T>
): [RenderHookResult<undefined, FieldBag<V>>, FormShared<T>] => {
    const {
        result: { current: bag }
    } = renderHook(() => useForm(config), {
        wrapper: ({ children }) => <FormPlugins plugins={createPluginArray(domPlugin)}>{children}</FormPlugins>
    });

    return [
        renderHook(() => useField<V>({ name }), {
            wrapper: ({ children }: PropsWithChildren<{}>) => (
                <FormPlugins plugins={createPluginArray(domPlugin)}>
                    <ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>
                        {children}
                    </ReactiveFormProvider>
                </FormPlugins>
            )
        }),
        bag
    ];
};

describe('useField', () => {
    it('should change value', () => {
        const [{ result }, { values }] = renderUseField<string>('hello', {
            initialValues: {
                hello: 'asdf'
            }
        });

        const wrapper = mount(<input {...result.current} />);

        act(() => {
            wrapper
                .find('input')
                .at(0)
                .simulate('change', { target: { name: result.current.name, value: 'new value' } });
        });

        expect(values.getValues()).toStrictEqual({
            hello: 'new value'
        });

        expect(result.current.value).toBe('new value');
    });

    it('should set touched', () => {
        const [{ result }, { touched }] = renderUseField<string>('hello', {
            initialValues: {
                hello: 'asdf'
            }
        });

        const wrapper = mount(<input {...result.current} />);

        act(() => {
            wrapper
                .find('input')
                .at(0)
                .simulate('blur', { target: { name: result.current.name } });
        });

        expect(touched.getValues()).toStrictEqual({
            hello: {
                $touched: true
            }
        });
    });
});
