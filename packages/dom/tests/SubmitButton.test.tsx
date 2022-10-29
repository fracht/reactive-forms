import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { domPlugin, SubmitButton, SubmitButtonBag } from '../src';

describe('SubmitButton', () => {
	it('should use default submit function and render default button', async () => {
		const submit = jest.fn();

		const { getByRole } = render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={{}} onSubmit={submit}>
					{() => <SubmitButton>submit</SubmitButton>}
				</ReactiveForm>
			</FormPlugins>,
		);

		expect(getByRole('button').innerHTML).toBe('submit');

		await act(() => {
			fireEvent.click(getByRole('button'));
		});

		expect(submit).toBeCalledTimes(1);
	});

	it('should call function renderer', async () => {
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
			</FormPlugins>,
		);

		expect(getByRole('button').innerHTML).toBe('custom button');

		await act(() => {
			fireEvent.click(getByRole('button'));
		});

		expect(submit).toBeCalledTimes(1);
	});

	it('should call custom action', async () => {
		const submit = jest.fn();
		const action = jest.fn();

		const { getByRole } = render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={{}} onSubmit={submit}>
					{() => <SubmitButton submitAction={action} />}
				</ReactiveForm>
			</FormPlugins>,
		);

		await act(() => {
			fireEvent.click(getByRole('button'));
		});

		expect(action).toBeCalledTimes(1);
		expect(submit).toBeCalledTimes(0);
	});

	it('button should be disabled while submitting', () => {
		const submit = jest.fn();

		const { getByRole } = render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={{}} onSubmit={submit}>
					{() => <SubmitButton />}
				</ReactiveForm>
			</FormPlugins>,
		);

		waitFor(() => {
			fireEvent.click(getByRole('button'));

			expect(getByRole('button').getAttribute('disabled')).toBe(true);
		}).then(() => {
			expect(getByRole('button').getAttribute('disabled')).toBe(false);
		});
	});
});
