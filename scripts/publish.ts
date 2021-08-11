#!/usr/bin/env zx

import { join } from 'path';

import { $, argv, chalk, fs, question } from 'zx';

const semver = require('semver');

const getPackages = async (rootDir: string) => {
    const allFiles = await fs.readdir(rootDir, { withFileTypes: true });

    return allFiles.filter((file) => file.isDirectory()).map((dirent) => join(rootDir, dirent.name));
};

const publishPackage = async (pkg: string, otp: string | undefined) => {
    const command = `npm publish ${join(pkg, 'prepublish').replace(/\\/g, '/')} --tag ${
        argv.type === 'dev' ? 'next' : 'latest'
    } ${argv.dry ? '--dry-run' : ''} ${otp ? `--otp ${otp}` : ''}`;
    $([command] as unknown as TemplateStringsArray);
};

const preparePackage = async (pkg: string) => {
    const packageJson = await fs
        .readFile(join(pkg, 'package.json'))
        .then((data: Buffer) => JSON.parse(data.toString()));

    delete packageJson.devDependencies;
    delete packageJson.resolutions;
    delete packageJson.scripts;

    await fs.rm(join(pkg, 'prepublish'), { recursive: true, force: true });
    await fs.mkdir(join(pkg, 'prepublish'), { recursive: true });

    await fs.writeFile(join(pkg, 'prepublish', 'package.json'), JSON.stringify(packageJson, null, 2));

    await fs.copy(join(pkg, 'dist'), join(pkg, 'prepublish', 'dist'));
    await fs.copyFile(join(pkg, 'LICENSE'), join(pkg, 'prepublish', 'LICENSE'));
    await fs.copyFile(join(pkg, 'README.md'), join(pkg, 'prepublish', 'README.md'));
};

const updatePackageVersion = async (folder: string, version: string) => {
    const packageJsonPath = join(folder, 'package.json');
    const packageJson = await fs.readFile(packageJsonPath).then((data: Buffer) => JSON.parse(data.toString()));

    packageJson.version = version;

    if (!argv.dry) {
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 4));
    }
};

const incrementVersion = async (folder: string, type: string) => {
    const packageJsonPath = join(folder, 'package.json');
    const packageJson = await fs.readFile(packageJsonPath).then((data: Buffer) => JSON.parse(data.toString()));
    const currentVersion = semver.coerce(packageJson.version)!;
    const sha = await $`git rev-parse --short HEAD`;

    let newVersion: string;

    switch (type) {
        case 'dev':
            currentVersion.prerelease = ['dev', sha.stdout.trim()];
            newVersion = currentVersion.format();
            break;
        case 'major':
            newVersion = currentVersion.inc('major').format();
            break;
        case 'minor':
            newVersion = currentVersion.inc('minor').format();
            break;
        case 'patch':
            newVersion = currentVersion.inc('patch').format();
            break;
        default:
            throw new Error(`Cannot increment version: ${type} type is not recognized`);
    }

    if (!argv.dry) {
        await updatePackageVersion(folder, newVersion);

        const packages = await getPackages(join(folder, 'packages'));

        await Promise.all(packages.map((pkg) => updatePackageVersion(pkg, newVersion)));
    }

    return newVersion;
};

const checkGit = async () => {
    const changedFiles = await $`git status --porcelain`;

    if (changedFiles.stdout.trim().length !== 0) {
        console.log(chalk.red.bold('You have uncommited files. Commit them before publishing'));

        throw '';
    }

    const currentBranch = (await $`git branch --show-current`).stdout.trim();

    if (currentBranch !== 'master') {
        console.log(
            chalk.red.bold(
                `You're trying to publish package in "${currentBranch}". Publishing is available only from "master" branch`
            )
        );

        throw '';
    }
};

await checkGit();

console.log(chalk.bold('Incrementing version'));

const version = await incrementVersion(process.cwd(), argv.type);

console.log(chalk.green('Successfully incremented version. New version is: '), chalk.cyan.bold(version));

console.log(chalk.bold('Bootstrapping packages'));

await $`npx lerna exec "npm install"`;

console.log(chalk.bold('Building packages'));

await $`npx lerna exec "npm run build"`;

const packages = await getPackages('packages');

console.log(chalk.bold('Prepare all packages'));

await Promise.all(packages.map(preparePackage));

console.log(chalk.bold('Publish all packages'));

const otp = argv.dry ? undefined : await question(chalk.yellow('Please, enter OTP: '));

await Promise.all(packages.map((pkg) => publishPackage(pkg, otp)));
