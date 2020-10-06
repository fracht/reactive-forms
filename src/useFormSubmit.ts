import { useCallback } from 'react';

import { useMorfixContext } from './MorfixContext';
import { MorfixValues, SubmitAction } from './types';

export const useFormSubmit = <Values extends MorfixValues>(submitAction?: SubmitAction<Values>) => {
    const { submitForm } = useMorfixContext<Values>();

    return useCallback(() => submitForm(submitAction), [submitForm, submitAction]);
};
