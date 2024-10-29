import baseConfig from '@reactive-tools/eslint-config';

export default [
	{
		ignores: ['**/dist', '**/node_modules', '**/*.config.js', '**/.tsup'],
	},
	...baseConfig,
];
