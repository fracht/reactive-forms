import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { act } from '@testing-library/react-hooks';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, SubmitButton } from '../src';

configureEnzyme();

describe('SubmitButton', () => {
    it('should use default submit function and render default button', async () => {
        const submit = jest.fn();

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    <SubmitButton>submit</SubmitButton>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('button').children().text()).toBe('submit');

        await act(async () => {
            wrapper.find('button').simulate('click');
        });

        expect(submit).toBeCalledTimes(1);
    });

    it('should call function renderer', async () => {
        const submit = jest.fn();

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    <SubmitButton>{(onSubmit) => <button onClick={onSubmit}>custom button</button>}</SubmitButton>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('button').children().text()).toBe('custom button');

        await act(async () => {
            wrapper.find('button').simulate('click');
        });

        expect(submit).toBeCalledTimes(1);
    });

    it('should call custom action', async () => {
        const submit = jest.fn();
        const action = jest.fn();

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    <SubmitButton submitAction={action}>
                        {(onSubmit) => <button onClick={onSubmit}>custom button</button>}
                    </SubmitButton>
                </ReactiveForm>
            </FormPlugins>
        );

        await act(async () => {
            wrapper.find('button').simulate('click');
        });

        expect(action).toBeCalledTimes(1);
        expect(submit).toBeCalledTimes(0);
    });
});
