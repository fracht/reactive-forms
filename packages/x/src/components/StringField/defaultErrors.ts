export type StringFieldErrors = {
	required?: string;
	minLength?: string | ((value: number) => string);
	maxLength?: string | ((value: number) => string);
};

const defaultErrors: StringFieldErrors = {
	minLength: (minLength: number) => `String should not include less than ${minLength} character(s)`,
	maxLength: (maxLength: number) => `String should not include more than ${maxLength} character(s)`,
};

export default defaultErrors;
