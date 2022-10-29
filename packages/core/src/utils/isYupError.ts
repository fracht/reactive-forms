import { ValidationError } from 'yup';

export const isYupError = (value: unknown): value is ValidationError => {
	return !!value && (value as ValidationError).name === 'ValidationError';
};
