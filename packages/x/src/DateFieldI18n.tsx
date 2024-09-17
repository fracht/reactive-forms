import React, { createContext, PropsWithChildren } from 'react';
import merge from 'lodash/merge';

import { formatDate } from './formatDate';

export type DateFieldI18n = {
	required: string;
	invalidInput: string;
	minDate: (min: Date, pickTime: boolean) => string;
	maxDate: (max: Date, pickTime: boolean) => string;
};

export const defaultDateFieldI18n: DateFieldI18n = {
	required: 'Field is required',
	invalidInput: 'Must be date',
	minDate: (min, pickTime) => `Date must not be earlier than ${formatDate(min, pickTime)}`,
	maxDate: (max, pickTime) => `Date must not be later than ${formatDate(max, pickTime)}`,
};

export const DateFieldI18nContext = createContext<DateFieldI18n>(defaultDateFieldI18n);

export type DateFieldI18nContextProviderProps = PropsWithChildren<{ i18n?: Partial<DateFieldI18n> }>;

export const DateFieldI18nContextProvider = ({ i18n, children }: DateFieldI18nContextProviderProps) => {
	return (
		<DateFieldI18nContext.Provider value={merge(defaultDateFieldI18n, i18n)}>
			{children}
		</DateFieldI18nContext.Provider>
	);
};
