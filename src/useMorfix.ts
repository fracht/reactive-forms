import { useState } from 'react';
import { MorfixConfig } from './Morfix';
import { MorfixValues, MorfixShared } from './types';

export const useMorfix = <Values extends MorfixValues>({
    initialValues
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [values, setValues] = useState(initialValues);

    return {
        values,
        setValues
    };
};
