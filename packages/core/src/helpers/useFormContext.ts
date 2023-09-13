import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { FormContext, FormContextType } from '../components/Form/FormContext';

export const useFormContext = <Values extends object>(): FormContextType<Values> => {
	const context = useContext(FormContext);

	invariant(context, "You're trying to access FormContext outside <ReactiveForm> tag");

	return context as unknown as FormContextType<Values>;
};
