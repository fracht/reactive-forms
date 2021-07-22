import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, Form } from '../src';

configureEnzyme();

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
});
