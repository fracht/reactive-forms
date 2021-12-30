const { danger, warn } = require('danger');

var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
    warn(
        'Pull Request size seems reatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.'
    );
}

if (danger.github.pr.assignee === null) {
    fail('Please assign someone to merge this PR, and optionally include people who should review.');
}
