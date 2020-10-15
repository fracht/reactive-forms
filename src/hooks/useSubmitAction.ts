import { useCallback } from 'react';

import { useMorfixContext } from './useMorfixContext';
import { SubmitAction } from '../typings/SubmitAction';

export const useSubmitAction = <Values>(action?: SubmitAction<Values>) => {
    const { submit } = useMorfixContext<Values>();

    const realSubmit = useCallback(() => submit(action), [action, submit]);

    return realSubmit;
};
