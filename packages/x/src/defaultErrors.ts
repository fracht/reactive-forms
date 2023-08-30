import stringFieldErrors, { StringFieldErrors } from './components/StringField/defaultErrors';

export type ErrorMessages = {
	StringField: StringFieldErrors;

	required: string;
};

export const defaultErrorMessages: ErrorMessages = {
	StringField: stringFieldErrors,

	required: 'Field is required',
};
