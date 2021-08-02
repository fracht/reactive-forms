import { useContext } from 'react';
import { containsPlugin, FormPluginsContext } from '@reactive-forms/core';

export const useInputField = () => {
    const plugins = useContext(FormPluginsContext);

    if (containsPlugin(plugins, Symbol.for('dom'))) {
    }
};
