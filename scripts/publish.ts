#!/usr/bin/env zxpp

/// <reference types="zx" />

import { spawn } from 'child_process';
import { join } from 'path';

import inquirer from 'inquirer';

const getPackages = async (rootDir: string) => {
    const allFiles = await fs.readdir(rootDir, { withFileTypes: true });

    const allDirs = allFiles.filter((file) => file.isDirectory());
    const allDirsContainingPackage = (
        await Promise.all(
            allDirs.map(async (dirent) => {
                try {
                    await fs.access(join(rootDir, dirent.name, 'package.json'));

                    return join(rootDir, dirent.name);
                } catch {
                    return undefined;
                }
            })
        )
    ).filter((value) => value !== undefined);

    return allDirsContainingPackage as string[];
};

const publishPackage = async (pkg: string, otp: string | undefined, type: string) => {
    const command = `npm publish ${join(pkg, 'prepublish').replace(/\\/g, '/')} --tag ${
        type === 'dev' ? 'next' : 'latest'
    } ${argv.dry ? '--dry-run' : ''} ${otp ? `--otp ${otp}` : ''}`;
    await $([command] as unknown as TemplateStringsArray);
};

const checkGit = async () => {
    const changedFiles = await $`git status --porcelain`;

    if (changedFiles.stdout.trim().length !== 0) {
        console.log(chalk.red.bold('You have uncommited files. Commit them before publishing'));

        throw '';
    }

    const currentBranch = (await $`git branch --show-current`).stdout.trim();

    if (currentBranch !== 'main') {
        console.log(
            chalk.red.bold(
                `You're trying to publish package in "${currentBranch}". Publishing is available only from "main" branch`
            )
        );

        throw '';
    }
};

const prepublish = () => {
    return new Promise((resolve, reject) => {
        const child = spawn('npx turbo run prepublish --filter=@reactive-forms/*', {
            stdio: ['ignore', 'pipe', 'pipe'],
            cwd: process.cwd(),
            shell: true,
            windowsHide: true
        });

        child.stdout.on('data', (data) => process.stdout.write(data));
        child.stderr.on('data', (data) => process.stderr.write(data));

        child.on('exit', (code) => {
            child.on('close', () => {
                if (code === 0) {
                    resolve(undefined);
                } else {
                    reject(code);
                }
            });
        });
    });
};

const main = async () => {
    const options: { type: string } = await inquirer.prompt([
        {
            type: 'list',
            choices: ['dev', 'patch', 'minor', 'major'],
            name: 'type',
            message: 'How to increment version?'
        }
    ]);

    const { type } = options;
    process.env.TYPE = type;

    await checkGit();

    const packages = await getPackages('packages');

    await prepublish();

    console.log(chalk.bold('Publish all packages'));

    let otp: string | undefined = undefined;

    if (!argv.dry) {
        otp = await question(chalk.yellow('Please, enter OTP: '));
    }

    await Promise.all(packages.map((pkg) => publishPackage(pkg, otp, type)));
};

await main();
