import { useCallback } from 'react';

import { SubmitAction } from '../typings/SubmitAction';
import { useFormContext } from './useFormContext';

export const useSubmitAction = <Values extends object>(action?: SubmitAction<Values>) => {
	const { submit } = useFormContext<Values>();

	const realSubmit = useCallback(() => submit(action), [action, submit]);

	return realSubmit;
};
