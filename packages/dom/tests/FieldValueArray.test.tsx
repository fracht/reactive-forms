import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { domPlugin, FieldValueArray } from '../src';

describe('FieldValueArray', () => {
    it('should pass correct object of values into children', () => {
        const initialValues = { test: 'hello', arr: [{ value: 'asdf' }], obj: { test: 42 } };

        const children = jest.fn();

        mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={initialValues}>
                    <FieldValueArray<{ helloValue: string; asdf_value: string; numberValue: number }>
                        helloValue="test"
                        asdf_value="arr.0.value"
                        numberValue="obj.test"
                    >
                        {children}
                    </FieldValueArray>
                </ReactiveForm>
            </FormPlugins>
        );

        expect(children).toBeCalledWith({
            helloValue: 'hello',
            asdf_value: 'asdf',
            numberValue: 42
        });
    });
});
