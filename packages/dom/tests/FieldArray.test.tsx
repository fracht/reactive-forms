import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { domPlugin, FieldArray } from '../src';

describe('FieldArray', () => {
    it('should rerender after items array has changed', async () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm<{ test: number[] }> initialValues={{ test: [1, 2] }}>
                    <FieldArray<number> name="test">
                        {(arrayHelpers) => (
                            <div>
                                {arrayHelpers.items.map((value, index) => (
                                    <span key={index}>{value}</span>
                                ))}
                                <button
                                    onClick={() => {
                                        arrayHelpers.push(3);
                                    }}
                                >
                                    add item
                                </button>
                            </div>
                        )}
                    </FieldArray>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('span').length).toBe(2);
        expect(wrapper.find('span').at(0).text()).toBe('1');

        await act(async () => {
            await wrapper.find('button').simulate('click');
            wrapper.mount();
        });

        expect(wrapper.find('span').length).toBe(3);
    });

    it('should render custom component, if specified', () => {
        const RenderComponent = () => {
            return <div id="test">from render component</div>;
        };

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    <FieldArray name="hello" as={RenderComponent} />
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('div').prop('id')).toBe('test');
    });

    it('should call function renderer', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    <FieldArray name="hello">{() => <div id="test" />}</FieldArray>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').prop('id')).toBe('test');
    });
});
