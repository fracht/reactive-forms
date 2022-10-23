import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { domPlugin, SubmitButton, SubmitButtonBag } from '../src';

describe('SubmitButton', () => {
    it('should use default submit function and render default button', () => {
        const submit = jest.fn();

        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    {() => <SubmitButton>submit</SubmitButton>}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(getByRole('button').innerHTML).toBe('submit');

        waitFor(() => {
            fireEvent.click(getByRole('button'));

            expect(submit).toBeCalledTimes(1);
        });
    });

    it('should call function renderer', () => {
        const CustomButton = ({ onClick, disabled }: SubmitButtonBag) => {
            return (
                <button onClick={onClick} disabled={disabled}>
                    custom button
                </button>
            );
        };

        const submit = jest.fn();

        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    {() => <SubmitButton as={CustomButton} />}
                </ReactiveForm>
            </FormPlugins>
        );

        expect(getByRole('button').innerHTML).toBe('custom button');

        waitFor(async () => {
            fireEvent.click(getByRole('button'));

            expect(submit).toBeCalledTimes(1);
        });
    });

    it('should call custom action', async () => {
        const submit = jest.fn();
        const action = jest.fn();

        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    {() => <SubmitButton submitAction={action} />}
                </ReactiveForm>
            </FormPlugins>
        );

        waitFor(async () => {
            fireEvent.click(getByRole('button'));

            expect(action).toBeCalledTimes(1);
            expect(submit).toBeCalledTimes(0);
        });
    });

    it('button should be disabled while submitting', () => {
        const submit = jest.fn();

        const { getByRole } = render(
            <FormPlugins plugins={createPluginArray(domPlugin)}>
                <ReactiveForm initialValues={{}} onSubmit={submit}>
                    {() => <SubmitButton />}
                </ReactiveForm>
            </FormPlugins>
        );

        waitFor(() => {
            fireEvent.click(getByRole('button'));

            expect(getByRole('button').getAttribute('disabled')).toBe(true);
        }).then(() => {
            expect(getByRole('button').getAttribute('disabled')).toBe(false);
        });
    });
});
