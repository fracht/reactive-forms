#!/usr/bin/env zxpp

/// <reference types="zx" />

import { join } from 'path';

import semver from 'semver';

console.log(chalk.bold('Running prepublish script in directory', process.cwd()));

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
        packageJson.version = newVersion;
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 4));
    }

    return newVersion;
};

console.log(chalk.bold('Incrementing version'));

const version = await incrementVersion(process.cwd(), process.env.TYPE as string);

console.log(chalk.green('Successfully incremented version. New version is: '), chalk.cyan.bold(version));

console.log(chalk.bold('Prepare package'));

await preparePackage(process.cwd());
