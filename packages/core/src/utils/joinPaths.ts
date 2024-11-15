import isNil from 'lodash/isNil.js';
import { RootPath, RootPathToken } from 'pxth';

export const joinPaths = (...parts: Array<string | null | false | RootPath | number>) =>
	parts.filter((part) => !isNil(part) && part !== false && part !== RootPathToken).join('.');
