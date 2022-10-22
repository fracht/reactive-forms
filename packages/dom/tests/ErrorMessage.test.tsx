import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { render } from '@testing-library/react';
import { createPxth } from 'pxth';

import { domPlugin, ErrorMessage } from '../src';

describe('ErrorMessage', () => {
    it('should not render empty error', () => {
        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{ test: '' }}>
                    {() => <ErrorMessage name={createPxth(['test'])} />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(() => getByRole('span')).toThrow();
    });

    it('should render error element', () => {
        const { getByText } = render(
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
                    {() => <ErrorMessage name={createPxth(['test'])} as="div" />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(getByText('test')).toBeDefined();
    });

    it('should render error component', () => {
        const ErrorComponent = ({ children }: { children?: string }) => {
            return children !== undefined ? <div>{children}</div> : null;
        };

        const { findByText } = render(
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
                    {() => <ErrorMessage name={createPxth(['test'])} as={ErrorComponent} />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(findByText('message')).toBeDefined();
    });

    it('should render error in span by default', () => {
        const { findByText } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{ test: '' }}
                    initialErrors={{
                        test: {
                            $error: 'error'
                        }
                    }}
                    initialTouched={{
                        test: {
                            $touched: true
                        }
                    }}
                >
                    {() => <ErrorMessage name={createPxth(['test'])} />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(findByText('error')).toBeDefined();
    });

    it('should call function renderer', () => {
        const { findByText } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{ test: '' }}
                    initialErrors={{
                        test: {
                            $error: 'error'
                        }
                    }}
                    initialTouched={{
                        test: {
                            $touched: true
                        }
                    }}
                >
                    {() => (
                        <ErrorMessage name={createPxth(['test'])}>
                            {({ children }) => <div>{children}</div>}
                        </ErrorMessage>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(findByText('error')).toBeDefined();
    });

    it('should not render error when touched=true and error=undefined', () => {
        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{ test: '' }}
                    initialTouched={{
                        test: {
                            $touched: true
                        }
                    }}
                >
                    {() => <ErrorMessage name={createPxth(['test'])} />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(() => getByRole('span')).toThrow();
    });
});
