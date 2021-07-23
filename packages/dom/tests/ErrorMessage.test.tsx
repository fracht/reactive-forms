import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { mount } from 'enzyme';

import { configureEnzyme } from './configureEnzyme';
import { domPlugin, ErrorMessage } from '../src';

configureEnzyme();

describe('ErrorMessage', () => {
    it('should not render empty error', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: '' }}>
                    <ErrorMessage name="test" />
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('span').length).toBe(0);
    });

    it('should render error element', () => {
        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{ test: '' }}
                    initialErrors={{
                        test: {
                            $error: 'test'
                        }
                    }}
                    initialTouched={{
                        test: {
                            $touched: true
                        }
                    }}
                >
                    <ErrorMessage name="test" as="div" />
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').text()).toBe('test');
    });

    it('should render error component', () => {
        const ErrorComponent = ({ children }: { children?: string }) => {
            return children !== undefined ? <div>{children}</div> : null;
        };

        const wrapper = mount(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{ test: '' }}
                    initialErrors={{
                        test: {
                            $error: 'message'
                        }
                    }}
                    initialTouched={{
                        test: {
                            $touched: true
                        }
                    }}
                >
                    <ErrorMessage name="test" as={ErrorComponent} />
                </ReactiveForm>
            </FormPlugins>
        );

        expect(wrapper.find('div').text()).toBe('message');
    });
});
