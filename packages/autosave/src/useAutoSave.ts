import { FormShared } from '@reactive-forms/core';
import isNil from 'lodash/isNil';
import { useContext, useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import { AutoSaveKey } from './AutoSaveKey';
import { AutoSaveContext } from './internal/AutoSaveContext';

export const useAutoSave = <T extends object>(autoSaveKey: AutoSaveKey | undefined, formBag: FormShared<T>) => {
    const autoSaveConfig = useContext(AutoSaveContext);

    invariant(isNil(autoSaveKey) || !isNil(autoSaveConfig), 'AutoSave key is set up, but AutoSaveService is not.');

    const isFirstTime = useRef(true);

    useEffect(() => {
        const save = autoSaveConfig?.save;

        if (!isNil(autoSaveKey) && !isNil(save)) {
            return formBag.values.watchAll((values) => {
                save(autoSaveKey, values);
            });
        }

        return undefined;
    }, [autoSaveConfig, autoSaveKey, formBag.values]);

    if (isFirstTime.current) {
        isFirstTime.current = false;
        if (!isNil(autoSaveKey) && !isNil(autoSaveConfig)) {
            const value = autoSaveConfig.load(autoSaveKey);
            if (!isNil(value)) {
                formBag.setValues(value as T);
            }
        }
    }
};
