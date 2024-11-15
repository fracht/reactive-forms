import toPath from 'lodash/toPath.js';

import type { RootPath } from './RootPath';
import { RootPathToken } from '.';

export const parseSegmentsFromString = (src: string | RootPath): string[] => (src === RootPathToken ? [] : toPath(src));
