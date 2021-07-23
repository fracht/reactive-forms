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

const preparePackage = async (pkg: string, version: string) => {
    const packageJson = await fs
        .readFile(join(pkg, 'package.json'))
        .then((data: Buffer) => JSON.parse(data.toString()));

    packageJson.version = version;

    if (!argv.dry) {
        await fs.writeFile(join(pkg, 'package.json'), JSON.stringify(packageJson, null, 4));
    }

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

const incrementVersion = async (folder: string, type: string) => {
    const packageLockPath = join(folder, 'package.json');
    const packageJson = await fs.readFile(packageLockPath).then((data: Buffer) => JSON.parse(data.toString()));
    const currentVersion = semver.coerce(packageJson.version)!;
    const sha = await $`git rev-parse --short HEAD`;

    let newVersion;

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

    packageJson.version = newVersion;

    if (!argv.dry) {
        await fs.writeFile(packageLockPath, JSON.stringify(packageJson, null, 4));
    }

    return newVersion;
};

console.log(chalk.bold('Bootstrapping packages'));

await $`npx lerna bootstrap`;

console.log(chalk.bold('Building packages'));

await $`npx lerna exec "npm run build"`;

console.log(chalk.bold('Incrementing version'));

const version = await incrementVersion(process.cwd(), argv.type);

console.log(chalk.green('Successfully incremented version. New version is: '), chalk.cyan.bold(version));

const packages = await getPackages('packages');

console.log(chalk.bold('Prepare all packages'));

await Promise.all(packages.map((pkg) => preparePackage(pkg, version)));

console.log(chalk.bold('Publish all packages'));

const otp = argv.dry ? undefined : await question(chalk.yellow('Please, enter OTP: '));

await Promise.all(packages.map((pkg) => publishPackage(pkg, otp)));
