export const MORFIX_PREFIX = 'mrfx';

export const getFieldKey = (name: string) => `${MORFIX_PREFIX}__${name}`;

export const getRawValueKey = (name: string) => `${MORFIX_PREFIX}__raw__${name}`;
