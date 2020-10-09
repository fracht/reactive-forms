import { MORFIX_ERROR_PATH } from '../constants';

export const fieldNameToErrorPath = (fieldName: string): string =>
    !fieldName || fieldName.trim().length === 0 ? MORFIX_ERROR_PATH : `${fieldName}.${MORFIX_ERROR_PATH}`;
