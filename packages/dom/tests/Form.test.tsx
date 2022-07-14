import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins, ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { act, renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import { createPxth } from 'pxth';

import { domPlugin, Form } from '../src';

describe('Form', () => {
    it('should render children', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    <Form>
                        <div id="children"></div>
                    </Form>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('#children').length).toBe(1);
    });

    it('should call submit function', async () => {
        const submit = jest.fn();

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    <Form>
                        <div>children</div>
                    </Form>
                </ReactiveForm>
            </FormPlugins>
        );

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });

        expect(submit).toBeCalledTimes(1);
    });

    it('should call provided submitAction', async () => {
        const submit = jest.fn();

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    <Form submitAction={submit}>
                        <div>children</div>
                    </Form>
                </ReactiveForm>
            </FormPlugins>
        );

        await act(async () => {
            wrapper.find('form').simulate('submit');
        });

        expect(submit).toBeCalledTimes(1);
    });

    it('should call onReset function', async () => {
        const { result: bag } = renderHook(() => useForm<object>({ initialValues: { test: 'initial' } }), {
            wrapper: ({ children }) => <FormPlugins plugins={createPluginArray(domPlugin)}>{children}</FormPlugins>
        });

        const wrapper = mount(
            <ReactiveFormProvider formBag={bag.current}>
                <Form>
                    <div>children</div>
                </Form>
            </ReactiveFormProvider>
        );

        await act(async () => {
            bag.current.setFieldValue(createPxth(['test']), 'modified');
            wrapper.find('form').simulate('reset');
        });

        expect(bag.current.values.getValue(createPxth(['test']))).toBe('initial');
    });
});
