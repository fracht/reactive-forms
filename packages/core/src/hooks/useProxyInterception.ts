import { useCallback } from 'react';
import { deepGet, deepSet, Pxth, relativePxth } from 'pxth';
import { intercept, StockProxy, useStockContext } from 'stocked';

import { useControlHandlers } from './useControlHandlers';
import { FormShared } from './useForm';
import { useFormContext } from './useFormContext';
import { FieldError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';

export const useProxyInterception = <V>(proxy: StockProxy<V>): FormShared<object> => {
	const { values, errors, touched, formMeta, registerValidator, validateField, ...other } = useFormContext();

	const newValues = useStockContext(values, proxy as StockProxy<unknown>);
	const newErrors = useStockContext(errors, proxy as StockProxy<unknown>);
	const newTouched = useStockContext(touched, proxy as StockProxy<unknown>);

	const handlers = useControlHandlers({ values: newValues, errors: newErrors, touched: newTouched, formMeta });

	const interceptedRegisterValidator = useCallback(
		<V>(name: Pxth<V>, validator: FieldValidator<V>) =>
			intercept(
				proxy as StockProxy<unknown>,
				name as Pxth<unknown>,
				registerValidator,
				(name, validator) => {
					const normalPath = proxy.getNormalPath(name);

					const interceptedValidator: FieldValidator<V> = async (realValue) => {
						let realError: unknown = {};

						const proxiedError = await validator(
							proxy.getValue(name, <U>(path: Pxth<U>) =>
								deepGet<U>(
									realValue,
									relativePxth(normalPath as Pxth<unknown>, path as Pxth<unknown>) as Pxth<U>,
								),
							),
						);

						proxy.setValue<unknown>(
							name,
							proxiedError,
							(path, innerValue) => {
								realError = deepSet(realError as object, relativePxth(normalPath, path), innerValue);
							},
							errors.getValue,
						);

						return realError as ReturnType<FieldValidator<V>>;
					};

					return registerValidator(normalPath as unknown as Pxth<V>, interceptedValidator);
				},
				[name as Pxth<unknown>, validator as FieldValidator<unknown>],
			),
		[errors.getValue, proxy, registerValidator],
	);

	const interceptedValidateField = useCallback(
		<E>(name: Pxth<E>, value: E) =>
			intercept(
				proxy as StockProxy<unknown>,
				name as Pxth<unknown>,
				validateField,
				<V>(name: Pxth<V>, proxiedValue?: V) => {
					let realValue: unknown = {};

					const normalPath = proxy.getNormalPath(name);

					// FIXME: fix types
					proxy.setValue(
						name as unknown as Pxth<V | undefined>,
						proxiedValue,
						(path, innerValue) => {
							realValue = deepSet(
								realValue as object,
								relativePxth(normalPath, path as Pxth<unknown>),
								innerValue,
							);
						},
						values.getValue,
					);

					return validateField(normalPath, realValue);
				},
				[name as Pxth<unknown>, value],
			),
		[proxy, validateField, values.getValue],
	);

	return {
		...other,
		...handlers,
		formMeta,
		values: newValues,
		errors: newErrors,
		touched: newTouched,
		registerValidator: interceptedRegisterValidator,
		validateField: interceptedValidateField as <V>(name: Pxth<V>, value?: V) => Promise<FieldError<V> | undefined>,
	};
};
