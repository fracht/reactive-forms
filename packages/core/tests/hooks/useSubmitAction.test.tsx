import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import ReactiveForm from '../../src';
import { useSubmitAction } from '../../src/hooks/useSubmitAction';

describe('useSubmitAction', () => {
	it('should return default submit', async () => {
		const onSubmit = jest.fn();
		const wrapper = ({ children }) => (
			<ReactiveForm initialValues={{ test: 42 }} onSubmit={onSubmit}>
				{() => children}
			</ReactiveForm>
		);

		const { result } = renderHook(() => useSubmitAction(), { wrapper });

		await act(async () => {
			await result.current();
		});

		expect(onSubmit).toBeCalledTimes(1);
	});

	it('should call provided action', async () => {
		const onSubmit = jest.fn();
		const action = jest.fn();
		const wrapper = ({ children }) => (
			<ReactiveForm initialValues={{ test: 42 }} onSubmit={onSubmit}>
				{() => children}
			</ReactiveForm>
		);

		const { result } = renderHook(() => useSubmitAction(action), { wrapper });

		await act(async () => {
			await result.current();
		});

		expect(onSubmit).toBeCalledTimes(0);
		expect(action).toBeCalledTimes(1);
	});
});
