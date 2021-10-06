import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';
import { createPxth } from 'pxth';

import { domPlugin, FieldValue } from '../src';

describe('FieldValue', () => {
    it('should render field value by default in Fragment', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: 'hello' }}>
                    {() => (
                        <div>
                            <FieldValue name={createPxth(['test'])} />
                        </div>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').text()).toBe('hello');
    });

    it('should render field value by as prop', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: 'hello' }}>
                    {() => <FieldValue name={createPxth(['test'])} as="div" />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').text()).toBe('hello');
    });
    it('should call function renderer', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: 'hello' }}>
                    {() => <FieldValue name={createPxth(['test'])}>{(value) => <span>{value}</span>}</FieldValue>}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('span').text()).toBe('hello');
    });
});
