import baseConfig from '@reactive-tools/eslint-config';

export default [
	{
		ignores: ['**/dist', '**/node_modules', '**/*.config.js', '**/prepared-package', '**/.tsup'],
	},
	...baseConfig,
];
