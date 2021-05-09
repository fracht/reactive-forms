import { danger, warn } from 'danger';
import type micromatch from 'micromatch';
const { match } = require('micromatch') as typeof micromatch;

const modifiedPackageJsons: string[] = match(danger.git.modified_files, '**/package.json');

modifiedPackageJsons.forEach((packageJson) => {
    const lockfile = packageJson.replace('package.json', 'package-lock.json');
    if (!danger.git.modified_files.includes(lockfile)) {
        warn(
            `Changes were made to ${packageJson}, but ${lockfile} still unchanged. If you changed dependencies, please, commit changed lockfile.`
        );
    }
});
