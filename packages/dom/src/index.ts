import { ChangeEvent, FocusEvent } from 'react';

export * from './renderComponent';
export * from './plugin';
export * from './useTextField';
export * from './useUncontrolledField';

// components
export * from './TextField';
export * from './SubmitButton';
export * from './Form';
export * from './ErrorMessage';
export * from './FieldArray';
export * from './FieldValue';
export * from './FieldValueArray';

declare module '@reactive-forms/core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface FormShared<Values extends object> {
        handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
        handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
    }
}
