export const joinPaths = (...parts: Array<string | null | false | number>) =>
    parts.filter((part) => part === 0 || Boolean(part)).join('.');
