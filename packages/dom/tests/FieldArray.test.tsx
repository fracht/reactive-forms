import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, FieldArray } from '../src';

configureEnzyme();
describe('FieldArray', () => {
    it('should call renderer function with arrayHelpers', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm<{ test: number[] }> initialValues={{ test: [1, 2] }}>
                    <FieldArray<number> name="test">
                        {(arrayHelpers) => (
                            <div>
                                {arrayHelpers.items.map((value, index) => (
                                    <span key={index}>{value}</span>
                                ))}
                            </div>
                        )}
                    </FieldArray>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('span').length).toBe(2);
        expect(wrapper.find('span').at(0).text()).toBe('1');
    });
});
