import { FormConfig, FormShared, Plugin } from '@reactive-forms/core';

export const xPlugin: Plugin = {
	token: Symbol.for('x'),
	useConfigDecorator: <T extends object>(config: FormConfig<T>) => config,
	useBagDecorator: <T extends object>(form: FormShared<T>) => form,
};
