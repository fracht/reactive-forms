import React from 'react';

import { FormShared } from '../hooks/useForm';
import { FormContext } from './FormContext';

export type ReactiveFormProviderProps<Values extends object> = {
	formBag: FormShared<Values>;
	fallback?: React.ReactNode;
	children: () => React.ReactNode;
};

export const ReactiveFormProvider = <Values extends object>({
	children,
	formBag,
	fallback,
}: ReactiveFormProviderProps<Values>) => {
	if (!formBag.isLoaded) {
		return <React.Fragment>{fallback}</React.Fragment>;
	}

	return <FormContext.Provider value={formBag as unknown as FormShared<object>}>{children()}</FormContext.Provider>;
};
