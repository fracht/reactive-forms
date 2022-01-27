export * from './plugin';
export * from './AutoSaveKey';
export * from './AutoSaveService';
export * from './AutoSaveServiceProvider';
export * from './localSaveService';

import { AutoSaveKey } from './AutoSaveKey';

declare module '@reactive-forms/core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface ExtendableFormConfig<Values extends object> {
        autoSaveKey?: AutoSaveKey;
    }
}
