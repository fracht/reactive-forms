import { useState, useCallback } from 'react';
import { MorfixConfig } from './Morfix';
import { MorfixValues, MorfixShared } from './types';
import { set } from 'lodash';

export const useMorfix = <Values extends MorfixValues>({
    initialValues
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [values, setValues] = useState(initialValues);

    const setFieldValue = useCallback(
        <T>(name: string, value: T) =>
            setValues({ ...set(values, name, value) }),
        []
    );

    return { values, setValues, setFieldValue, initialValues };
};
