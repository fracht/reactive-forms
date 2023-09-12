import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { createPxth } from 'pxth';

import {
	FormConfig,
	FormShared,
	ReactiveFormProvider,
	useFieldValidator,
	UseFieldValidatorConfig,
	useForm,
} from '../../src';

const renderUseFieldValidator = <V, T extends object>(
	config: UseFieldValidatorConfig<V>,
	formConfig: FormConfig<T>,
) => {
	const {
		result: { current: bag },
	} = renderHook(() => useForm(formConfig));

	const wrapper = ({ children }: PropsWithChildren) => (
		<ReactiveFormProvider formBag={bag as unknown as FormShared<object>}>{children}</ReactiveFormProvider>
	);

	return [renderHook(() => useFieldValidator<V>(config), { wrapper }), bag.validateField] as const;
};

describe('useFieldValidator', () => {
	it('should run validator and return errors', async () => {
		const [, runValidate] = renderUseFieldValidator(
			{
				name: createPxth<string>(['user', 'name']),
				validator: (value: string) => (value.length >= 6 ? undefined : 'Min length is 6'),
			},
			{
				initialValues: {},
			},
		);

		await expect(runValidate(createPxth(['user', 'name']), 'Hello')).resolves.toStrictEqual({
			$error: 'Min length is 6',
		});
		await expect(runValidate(createPxth(['user', 'name']), 'Helloa')).resolves.toStrictEqual({ $error: undefined });
	});

	it('should return undefined, when no validator specified', async () => {
		const [, runValidate] = renderUseFieldValidator(
			{
				name: createPxth(['user', 'name']),
			},
			{
				initialValues: {},
			},
		);

		await expect(runValidate(createPxth(['user', 'name']), 'any value')).resolves.toStrictEqual({
			$error: undefined,
		});
	});
});
