import React, { PropsWithChildren } from 'react';

import { FormContext } from './FormContext';
import { FormShared } from '../hooks/useForm';

export type ReactiveFormProviderProps<Values extends object> = PropsWithChildren<{
	formBag: FormShared<Values>;
}>;

export const ReactiveFormProvider = <Values extends object>({
	children,
	formBag,
}: ReactiveFormProviderProps<Values>) => (
	<FormContext.Provider value={formBag as unknown as FormShared<object>}>{children}</FormContext.Provider>
);
