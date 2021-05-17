export const MORFIX_PREFIX = 'mrfx';
export const MORFIX_ERROR_PREFIX = `${MORFIX_PREFIX}Error`;
export const META_KEY_ERRORS = 'errors';
export const META_KEY_TOUCHED = 'touched';
export const META_KEY_GLOBAL_META = 'globalMeta';

export const getErrorPath = (path?: string): string => (path ? `${path}.${MORFIX_ERROR_PREFIX}` : MORFIX_ERROR_PREFIX);
