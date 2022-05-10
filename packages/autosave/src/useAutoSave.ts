import { useCallback, useContext, useEffect, useRef } from 'react';
import { FormShared } from '@reactive-forms/core';
import invariant from 'tiny-invariant';

import { AutoSaveContext } from './internal/AutoSaveContext';
import { AutoSaveService } from './AutoSaveService';

export type AutoSaveConfig<T extends object> = {
    onLoaded?: (values: T) => void;
    service?: AutoSaveService<T>;
};

export type AutoSaveControl = {
    remove: () => void;
};

export const useAutoSave = <T extends object>(
    formBag: FormShared<T>,
    autoSaveKey: string,
    config?: AutoSaveConfig<T>
): AutoSaveControl => {
    const contextService = useContext(AutoSaveContext);

    const service = contextService || config?.service;

    invariant(service, 'Cannot apply auto save on form - no AutoSaveService provided.');

    useEffect(() => {
        return formBag.values.watchAll((values) => {
            service.save(autoSaveKey, values);
        });
    }, [service, autoSaveKey, formBag.values]);

    const isFirstTime = useRef(true);

    useEffect(() => {
        const load = async () => {
            const [loaded, value] = await service.load(autoSaveKey);
            if (loaded) {
                formBag.setValues(value as T);
                config?.onLoaded?.(value as T);
            }
        };

        if (isFirstTime.current) {
            isFirstTime.current = false;
            load();
        }
    }, [autoSaveKey, config, formBag, service]);

    const removeAutoSave = useCallback(() => {
        service.remove(autoSaveKey);
    }, [autoSaveKey, service]);

    return {
        remove: removeAutoSave
    };
};
