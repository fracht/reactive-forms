import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, SubmitButton, SubmitButtonBag } from '../src';

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
        const CustomButton = ({ onClick, disabled }: SubmitButtonBag) => {
            return (
                <button onClick={onClick} disabled={disabled}>
                    custom button
                </button>
            );
        };

        const submit = jest.fn();

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    <SubmitButton as={CustomButton} />
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
                    <SubmitButton submitAction={action} />
                </ReactiveForm>
            </FormPlugins>
        );

        await act(async () => {
            await wrapper.find('button').simulate('click');
        });

        expect(action).toBeCalledTimes(1);
        expect(submit).toBeCalledTimes(0);
    });

    it('button should be disabled while submitting', async () => {
        const submit = jest.fn();

        let wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    <SubmitButton />
                </ReactiveForm>
            </FormPlugins>
        );

        await act(async () => {
            await wrapper.find('button').simulate('click');
            wrapper = wrapper.mount();
        });

        expect(wrapper.find('button').prop('disabled')).toBe(true);

        await act(async () => {
            wrapper = wrapper.mount();
        });

        expect(wrapper.find('button').prop('disabled')).toBe(false);
    });
});
