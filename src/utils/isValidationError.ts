import { ValidationError } from 'yup';

export const isValidationError = (error: unknown): error is ValidationError =>
    Object.prototype.hasOwnProperty.call(error, 'name') && (error as ValidationError).name === 'ValidationError';
