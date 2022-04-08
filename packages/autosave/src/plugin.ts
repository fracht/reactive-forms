import { FormConfig, FormShared, Plugin } from '@reactive-forms/core';
import isNil from 'lodash/isNil';
import invariant from 'tiny-invariant';

import { useAutoSave } from './useAutosave';

export const autoSavePlugin: Plugin = {
    token: Symbol.for('autosave'),
    useConfigDecorator: (config) => {
        if (isNil(config.autoSaveKey)) {
            return config;
        }

        invariant(isNil(config.load), 'Currently not supported auto save with "load" option.');

        return config;
    },
    useBagDecorator: <T extends object>(form: FormShared<T>, config: FormConfig<T>) => {
        useAutoSave({ autoSaveKey: config.autoSaveKey, onAutoSaveLoaded: config.onAutoSaveLoaded }, form);

        return form;
    }
};
