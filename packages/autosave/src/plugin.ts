import { useContext, useEffect, useRef } from 'react';
import { FormConfig, FormShared, Plugin } from '@reactive-forms/core';
import isNil from 'lodash/isNil';
import invariant from 'tiny-invariant';

import { AutoSaveContext } from './internal/AutoSaveContext';
import { AutoSaveKey } from '.';

const autoSaveLoadedValuesCache: Record<AutoSaveKey, unknown> = {};
const queuedAutoSaveLoads: Record<AutoSaveKey, Promise<unknown>> = {};

export const autosavePlugin: Plugin = {
    token: Symbol.for('autosave'),
    useConfigDecorator: (config) => {
        if (isNil(config.autoSaveKey)) {
            return config;
        }

        invariant(isNil(config.load), 'Currently not supported autosave with "load" option.');

        return config;
    },
    useBagDecorator: <T extends object>(form: FormShared<T>, config: FormConfig<T>) => {
        const autoSaveConfig = useContext(AutoSaveContext);
        const autoSaveKey = config.autoSaveKey;

        invariant(isNil(autoSaveKey) || !isNil(autoSaveConfig), 'AutoSave key is set up, but AutoSaveService is not.');

        const isFirstTime = useRef(true);

        useEffect(() => {
            const key = config.autoSaveKey;
            const save = autoSaveConfig?.save;

            if (!isNil(key) && !isNil(save)) {
                return form.values.watchAll((values) => {
                    save(key, values);
                });
            }

            return undefined;
        }, [autoSaveConfig, config.autoSaveKey, form.values]);

        if (isFirstTime.current && !isNil(autoSaveKey)) {
            if (autoSaveKey in autoSaveLoadedValuesCache) {
                form.setValues(autoSaveLoadedValuesCache[autoSaveKey] as T);
                isFirstTime.current = false;
            } else if (autoSaveKey in queuedAutoSaveLoads) {
                throw queuedAutoSaveLoads[autoSaveKey];
            } else {
                const currentPromise = autoSaveConfig!.load(autoSaveKey).then((value) => {
                    autoSaveLoadedValuesCache[autoSaveKey] = value;
                    delete queuedAutoSaveLoads[autoSaveKey];
                });

                queuedAutoSaveLoads[autoSaveKey] = currentPromise;

                throw currentPromise;
            }
        }

        return form;
    }
};
