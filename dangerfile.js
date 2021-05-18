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

var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
    warn(
        'Pull Request size seems reatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.'
    );
}

if (danger.github.pr.assignee === null) {
    fail('Please assign someone to merge this PR, and optionally include people who should review.');
}
