import { ChangeEvent, FocusEvent } from 'react';

import { TextInputElement } from './TextInputElement';

export * from './renderComponent';
export * from './plugin';
export * from './useField';

// components
export * from './Field';
export * from './SubmitButton';
export * from './Form';
export * from './ErrorMessage';
export * from './FieldArray';
export * from './FieldValue';
export * from './FieldValueArray';

declare module '@reactive-forms/core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface FormShared<Values extends object> {
        handleChange: (e: ChangeEvent<TextInputElement>) => void;
        handleBlur: (e: FocusEvent<TextInputElement>) => void;
    }
}
