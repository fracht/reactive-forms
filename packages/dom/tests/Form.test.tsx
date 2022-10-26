import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins, ReactiveFormProvider, useForm } from '@reactive-forms/core';
import { fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import { createPxth } from 'pxth';

import { domPlugin, Form } from '../src';

describe('Form', () => {
    it('should render children', () => {
        const { getByTestId } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    {() => (
                        <Form>
                            <div data-testid="children"></div>
                        </Form>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(getByTestId('children')).toBeDefined();
    });

    it('should call submit function', async () => {
        const submit = jest.fn();

        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    {() => (
                        <Form>
                            <div>children</div>
                        </Form>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        waitFor(() => {
            fireEvent.submit(getByRole('form'));

            expect(submit).toBeCalledTimes(1);
        });
    });

    it('should call provided submitAction', async () => {
        const submit = jest.fn();

        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}}>
                    {() => (
                        <Form submitAction={submit}>
                            <div>children</div>
                        </Form>
                    )}
                </ReactiveForm>
            </FormPlugins>
        );

        waitFor(() => {
            fireEvent.submit(getByRole('form'));

            expect(submit).toBeCalledTimes(1);
        });
    });

    it('should call onReset function', async () => {
        const { result: bag } = renderHook(() => useForm<object>({ initialValues: { test: 'initial' } }), {
            wrapper: ({ children }) => <FormPlugins plugins={createPluginArray(domPlugin)}>{children}</FormPlugins>
        });

        const { getByRole } = render(
            <ReactiveFormProvider formBag={bag.current}>
                {() => (
                    <Form role="form">
                        <div>children</div>
                    </Form>
                )}
            </ReactiveFormProvider>
        );

        waitFor(() => {
            bag.current.setFieldValue(createPxth(['test']), 'modified');
            fireEvent.reset(getByRole('form'));

            expect(bag.current.values.getValue(createPxth(['test']))).toBe('initial');
        });
    });
});
