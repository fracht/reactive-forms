import React from 'react';
import { act } from 'react-dom/test-utils';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, FieldArray } from '../src';

configureEnzyme();
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
});
