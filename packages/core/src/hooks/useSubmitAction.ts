import { useCallback } from 'react';

import { useFormContext } from './useFormContext';
import { SubmitAction } from '../typings/SubmitAction';

export const useSubmitAction = <Values extends object>(action?: SubmitAction<Values>) => {
	const { submit } = useFormContext<Values>();

	const realSubmit = useCallback(() => submit(action), [action, submit]);

	return realSubmit;
};
