import { ChangeEvent, FocusEvent } from 'react';

export * from './renderComponent';
export * from './plugin';
export * from './useTextField';
export * from './useUncontrolledField';

// Components
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
		handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
		handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
	}
}
