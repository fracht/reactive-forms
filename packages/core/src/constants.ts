export const REACTIVE_FORMS_PREFIX = '$';
export const REACTIVE_FORMS_ERROR_PREFIX = `${REACTIVE_FORMS_PREFIX}error`;

export const getErrorPath = (path?: string): string =>
	path ? `${path}.${REACTIVE_FORMS_ERROR_PREFIX}` : REACTIVE_FORMS_ERROR_PREFIX;
