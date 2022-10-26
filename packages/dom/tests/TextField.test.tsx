import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { render } from '@testing-library/react';
import { createPxth } from 'pxth';

import { domPlugin, TextField } from '../src';

describe('TextField', () => {
    it('should render input by default', () => {
        const { container } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>{() => <TextField name={createPxth(['hello'])} />}</ReactiveForm>
            </FormPlugins>
        );

        expect(container.querySelector('input')).toBeDefined();
        expect(container.querySelector('input')?.getAttribute('name')).toBe('hello');
    });

    it('should render custom element, if specified', () => {
        const { getByTestId } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    {() => <TextField name={createPxth(['hello'])} as="div" data-testid="test" />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(getByTestId('test')).toBeDefined();
        expect(getByTestId('test').getAttribute('name')).toBe('hello');
    });

    it('should pass children to custom element', () => {
        const { container, getAllByRole } = render(
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

        expect(container.querySelector('select')).toBeDefined();
        expect(container.querySelector('select')?.getAttribute('name')).toBe('hello');
        expect(getAllByRole('option').length).toBe(3);
    });

    it('should call function renderer', () => {
        const { getByTestId, getByText } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm
                    initialValues={{
                        hello: 'asdf'
                    }}
                >
                    {() => (
                        <TextField name={createPxth(['hello'])}>
                            {(bag) => <div data-testid="testID">{bag.value}</div>}
                        </TextField>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(getByTestId('testID')).toBeDefined();
        expect(getByText('asdf')).toBeDefined();
    });

    it('should render custom component', () => {
        const DummyComponent = ({ firstName }: { firstName: string }) => {
            return <div data-testid="dummy">Hello {firstName}!</div>;
        };

        const { getByTestId, getByText } = render(
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

        expect(getByTestId('dummy')).toBeDefined();
        expect(getByText('Hello world!')).toBeDefined();
    });
});
