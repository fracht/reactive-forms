import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createPxth, getPxthSegments, Pxth } from 'pxth';
import { MappingProxy } from 'stocked';

import { FieldInnerError, FieldValidator, ReactiveFormProvider, useForm } from '../../src';
import { useProxyInterception } from '../../src/hooks/useProxyInterception';
import { NestedObject } from '../../src/typings/NestedObject';

type ProxyValue = {
	id: number;
	person: {
		address: string;
		birthDate: Date;
	};
	languages: string[];
};

const renderUseProxyInterception = () => {
	const { result: bag } = renderHook(() =>
		useForm({
			initialValues: {
				values: {
					real: {
						person_id: 1,
						data: {
							p_address: 'hello',
							p_birthDate: new Date(),
						},
						learned_languages: ['EN', 'LT'],
					},
				},
			},
		}),
	);

	const proxy = new MappingProxy<ProxyValue>(
		{
			id: createPxth<number>(['values', 'real', 'person_id']),
			person: {
				address: createPxth<string>(['values', 'real', 'data', 'p_address']),
				birthDate: createPxth<Date>(['values', 'real', 'data', 'p_birthDate']),
			},
			languages: createPxth<string[]>(['values', 'real', 'learned_languages']),
		},
		createPxth(['values', 'proxy']),
	);

	proxy.activate();

	const registerValidator = jest.fn(bag.current.registerValidator);
	const validateField = jest.fn(bag.current.validateField);

	const { result } = renderHook(() => useProxyInterception(proxy), {
		wrapper: ({ children }) => {
			return (
				<ReactiveFormProvider
					formBag={{
						...bag.current,
						registerValidator: registerValidator as <V>(
							name: Pxth<V>,
							validator: FieldValidator<V>,
						) => () => void,
						validateField: validateField as <V>(
							name: Pxth<V>,
							value: V,
						) => Promise<NestedObject<FieldInnerError, V>>,
					}}
				>
					{() => children}
				</ReactiveFormProvider>
			);
		},
	});

	return { result, registerValidator, validateField };
};

describe('useProxyInterception', () => {
	it('intercepted registerValidator should get normal path', () => {
		const { result, registerValidator } = renderUseProxyInterception();

		const proxiedPath = createPxth<ProxyValue['person']>(['values', 'proxy', 'person']);
		const validator = jest.fn();

		result.current.registerValidator(proxiedPath, validator);

		expect(getPxthSegments(registerValidator.mock.calls[0][0])).toStrictEqual(['values', 'real', 'data']);
	});

	it('intercepted registerValidator should register intercepted validator function correctly', async () => {
		const { result, registerValidator } = renderUseProxyInterception();

		const proxiedPath = createPxth<ProxyValue['person']>(['values', 'proxy', 'person']);
		const validator = jest.fn((value: ProxyValue['person']) => {
			if (!value.address) {
				return {
					address: {
						$error: 'error 1',
					},
					birthDate: {
						$error: 'error 2',
					},
				};
			}

			return '';
		});

		result.current.registerValidator(proxiedPath, validator);

		const interceptedValidator = registerValidator.mock.calls[0][1];

		const date = new Date();
		const realValues = {
			p_address: '',
			p_birthDate: date,
		};
		const error = await interceptedValidator(realValues);

		expect(validator.mock.calls[0][0]).toStrictEqual({
			address: '',
			birthDate: date,
		});

		expect(error).toStrictEqual({
			p_address: {
				$error: 'error 1',
			},
			p_birthDate: {
				$error: 'error 2',
			},
		});
	});

	it('intercepted validateField should call validateField with real path and real values', () => {
		const { result, validateField } = renderUseProxyInterception();

		const proxiedFieldPath = createPxth(['values', 'proxy', 'person']);

		result.current.validateField(proxiedFieldPath, { address: 'asdf', birthDate: new Date(100) });
		expect(getPxthSegments(validateField.mock.calls[0][0])).toStrictEqual(['values', 'real', 'data']);
		expect(validateField.mock.calls[0][1]).toStrictEqual({
			p_address: 'asdf',
			p_birthDate: new Date(100),
		});
	});

	it('intercepted registerValidator should call real registerValidator', () => {
		const { result, registerValidator } = renderUseProxyInterception();

		const realPath = createPxth(['values', 'real', 'data']);
		const validator = jest.fn();

		result.current.registerValidator(realPath, validator);

		expect(registerValidator.mock.calls[0][0]).toBe(realPath);
		expect(registerValidator.mock.calls[0][1]).toBe(validator);
	});

	it('intercepted validateField should call real validateField', () => {
		const { result, validateField } = renderUseProxyInterception();

		const realPath = createPxth(['values', 'real', 'data']);
		const values = {
			p_address: 'hello',
			p_birthDate: new Date(),
		};

		result.current.validateField(realPath, values);

		expect(validateField.mock.calls[0][0]).toBe(realPath);
		expect(validateField.mock.calls[0][1]).toBe(values);
	});
});
