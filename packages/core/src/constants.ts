export const MORFIX_PREFIX = 'mrfx';
export const MORFIX_ERROR_PREFIX = `${MORFIX_PREFIX}Error`;

export const getErrorPath = (path?: string): string => (path ? `${path}.${MORFIX_ERROR_PREFIX}` : MORFIX_ERROR_PREFIX);
