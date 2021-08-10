import isNil from 'lodash/isNil';
import { ROOT_PATH } from 'stocked';

export const joinPaths = (...parts: Array<string | null | false | typeof ROOT_PATH | number>) =>
    parts.filter((part) => !isNil(part) && part !== false && part !== ROOT_PATH).join('.');
