import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';
import { createPxth } from 'pxth';

import { domPlugin, TextField } from '../src';

describe('TextField', () => {
    it('should render input by default', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>{() => <TextField name={createPxth(['hello'])} />}</ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('input').length).toBe(1);
        expect(wrapper.find('input').at(0).prop('name')).toBe('hello');
    });

    it('should render custom element, if specified', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    {() => <TextField name={createPxth(['hello'])} as="div" />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('div').at(0).prop('name')).toBe('hello');
    });

    it('should pass children to custom element', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    {() => (
                        <TextField name={createPxth(['hello'])} as="select">
                            <option value="1">asdf</option>
                            <option value="2">asdf</option>
                            <option value="3">asdf</option>
                        </TextField>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('select').length).toBe(1);
        expect(wrapper.find('select').at(0).prop('name')).toBe('hello');
        expect(wrapper.find('select').find('option').length).toBe(3);
    });

    it('should call function renderer', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{
                        hello: 'asdf'
                    }}
                >
                    {() => (
                        <TextField name={createPxth(['hello'])}>
                            {(bag) => <div id="testID">{bag.value}</div>}
                        </TextField>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('#testID').length).toBe(1);
        expect(wrapper.find('#testID').at(0).text()).toBe('asdf');
    });

    it('should render custom component', () => {
        const DummyComponent = ({ firstName }: { firstName: string }) => {
            return <div id="dummy">Hello {firstName}!</div>;
        };

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{
                        hello: 'asdf'
                    }}
                >
                    {() => <TextField name={createPxth(['hello'])} firstName="world" as={DummyComponent} />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('#dummy').length).toBe(1);
        expect(wrapper.find('#dummy').at(0).text()).toBe('Hello world!');
    });
});
