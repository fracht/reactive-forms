import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, FieldValue } from '../src';

configureEnzyme();

describe('FieldValue', () => {
    it('should render field value by default in Fragment', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: 'hello' }}>
                    <div>
                        <FieldValue name="test" />
                    </div>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').text()).toBe('hello');
    });

    it('should render field value by as prop', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: 'hello' }}>
                    <FieldValue name="test" as="div" />
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').text()).toBe('hello');
    });
    it('should call function renderer', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: 'hello' }}>
                    <FieldValue name="test">{(value) => <span>{value}</span>}</FieldValue>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('span').text()).toBe('hello');
    });
});
