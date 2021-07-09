export const REACTIVE_FORMS_PREFIX = 'mrfx';
export const REACTIVE_FORMS_ERROR_PREFIX = `${REACTIVE_FORMS_PREFIX}Error`;

export const getErrorPath = (path?: string): string =>
    path ? `${path}.${REACTIVE_FORMS_ERROR_PREFIX}` : REACTIVE_FORMS_ERROR_PREFIX;
