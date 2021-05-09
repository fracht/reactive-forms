const { danger, warn } = require('danger');
const { match } = require('micromatch');

const modifiedPackageJsons = match(danger.git.modified_files, '**/package.json');

modifiedPackageJsons.forEach((packageJson) => {
    const lockfile = packageJson.replace('package.json', 'package-lock.json');
    if (!danger.git.modified_files.includes(lockfile)) {
        warn(
            `Changes were made to ${packageJson}, but ${lockfile} still unchanged. If you changed dependencies, please, commit changed lockfile.`
        );
    }
});
