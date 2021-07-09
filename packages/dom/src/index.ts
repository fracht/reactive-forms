import { ChangeEvent, FocusEvent } from 'react';

export * from './renderComponent';
export * from './plugin';

declare module '@morf1x/core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface MorfixShared<Values extends object> {
        handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
        handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
    }
}
