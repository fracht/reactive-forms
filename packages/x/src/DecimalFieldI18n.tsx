import React, { createContext, PropsWithChildren } from 'react';
import merge from 'lodash/merge';

export const defaultFormat = (value: number | null | undefined, precision: number) => {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		return '';
	}

	return value.toFixed(precision).toString();
};

export type DecimalFieldI18n = {
	required: string;
	invalidInput: string;
	minValue: (value: number, precision: number) => string;
	maxValue: (value: number, precision: number) => string;
};

export const defaultDecimalFieldI18n: DecimalFieldI18n = {
	required: 'Field is required',
	invalidInput: 'Must be decimal',
	minValue: (min: number, precision: number) => `Value should not be less than ${defaultFormat(min, precision)}`,
	maxValue: (max: number, precision: number) => `Value should not be greater than ${defaultFormat(max, precision)}`,
};

export const DecimalFieldI18nContext = createContext<DecimalFieldI18n>(defaultDecimalFieldI18n);

export type DecimalFieldI18nContextProviderProps = PropsWithChildren<{ i18n?: Partial<DecimalFieldI18n> }>;

export const DecimalFieldI18nContextProvider = ({ i18n, children }: DecimalFieldI18nContextProviderProps) => {
	return (
		<DecimalFieldI18nContext.Provider value={merge(defaultDecimalFieldI18n, i18n)}>
			{children}
		</DecimalFieldI18nContext.Provider>
	);
};
