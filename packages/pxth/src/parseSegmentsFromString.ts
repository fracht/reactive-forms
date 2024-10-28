import toPath from 'lodash/toPath';

import type { RootPath } from './RootPath';
import { RootPathToken } from '.';

export const parseSegmentsFromString = (src: string | RootPath): string[] =>
    src === RootPathToken ? [] : toPath(src);
