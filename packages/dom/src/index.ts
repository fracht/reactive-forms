export * from './renderComponent';
export * from './plugin';
export * from './useTextField';

declare module '@reactive-forms/core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface FormShared<Values extends object> {
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    }
}
